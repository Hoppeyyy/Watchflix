import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function Sockets() {
  const [mySoc, setMySoc] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [inputTxt, setInputTxt] = useState("");
  const [mousePos, setMousePos] = useState({
    left:0,
    top:0
  })

  const [users, setUsers] = useState({});

  useEffect(()=>{
    // const socket = io("ws://example.com/my-namespace", {
    //   reconnectionDelayMax: 10000,
    //   auth: {
    //     token: "123"
    //   },
    //   query: {
    //     "my-key": "my-value"
    //   }
    // });
    const socket = io("http://localhost:8888");

    socket.on("user_connected", (users)=>{
      setUsers(users);
    })

    socket.on("change", (id, txt)=>{
      // alert(`${id}has connected"`);
      setMsgs((prev)=>[
        ...prev,
        `${id} says ${txt}`
      ])
    });

    socket.on("update_mouse", (x, y)=>{
      // setMousePos({
      //   left:x,
      //   top:y
      // })
      setUsers((prev)=>({
        ...prev,
        [id]:{left:x, top:y}
      }))
    })

    setMySoc(socket);
  }, []);

  const SendToIO = async () =>{
    mySoc.emit("alert_all", inputTxt)
  }

  const MouseMoveUpdate = async (x, y) =>{
    console.log(x,y)
    mySoc.emit("mouse_moved", x, y)
  }

  const colors = ["green", "yellow", "blue", "red", "purple"];

  return (
    <div onMouseMove={(e)=>MouseMoveUpdate(e.clientX, e.clientY)}>
      {Object.values(users).map((o,i)=><div style={{
          background:colors[i%5],
          position:"relative",
          width:10,
          height:10,
          left:o.left,
          top:o.top 
        }} />
      )}
      <input type='text' onChange={(e)=>setInputTxt(e.target.value)} />
      <button onClick={SendToIO}>Alert Everyone!</button>
      {msgs.map((o,i)=><div style={{background:"red", padding:10}}>
        {o}
        </div>)}
    </div>
  )
}