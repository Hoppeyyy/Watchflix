const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const movieRouter = require('./Routes/movieRoute')
const config = require('./config')
const userRouter = require('./Routes/userRoute')
const uuidRouter = require('./Routes/uuidRoute')

//--------------------Socket-------------------
const http = require('http');
const { Server } = require("socket.io")
const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin:["http://localhost:3000"],
    allowedHeaders:["Access-Control-Allow-Origin"],
    credentials:true
  }
});

const PORT = process.env.PORT || 8888;

const users = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  users[socket.id] = {left:0, top:0};
  io.emit("user_connected", users);


  socket.on("alert_all", (txt)=>{
    io.emit("change", socket.id, txt);
  })

  socket.on("mouse_moved", (x, y)=>{

    socket.broadcast.emit("update_mouse", x, y, socket.id);
  })

  socket.on("disconnected", ()=>{
    delete users[socket.id];
    io.emit("user_connected", users);
  })
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// mongodb database -----------------------------------------------

app.use(cors());
app.use(express.json())


mongoose.connect(config.MONGODB_URL, (err)=>{
  if(err) return console.log(err)
  console.log('connect to db successfully')
  
});

app.use(movieRouter);
app.use(userRouter);
app.use(uuidRouter);


app.listen(3001, ()=> console.log('express server is running on 3001'))
