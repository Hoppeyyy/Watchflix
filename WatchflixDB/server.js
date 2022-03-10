const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const movieRouter = require('./Routes/movieRoute')
const config = require('./config')
const userRouter = require('./Routes/userRoute')

app.use(cors());
app.use(express.json())


mongoose.connect(config.MONGODB_URL, (err)=>{
  if(err) return console.log(err)
  console.log('connect to db successfully')
  
});

app.use(movieRouter);
app.use(userRouter);
//app.use(todoRouter)

app.listen(3001, ()=> console.log('express server is running on 3001'))