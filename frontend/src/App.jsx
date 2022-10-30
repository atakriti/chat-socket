import {useEffect, useState} from "react"
import io from "socket.io-client"
let socket = io.connect("http://localhost:4000")
function App() {
  let [input, setInput] = useState("")
  let [array, setArray] = useState([])
  let [room,setRoom] = useState("")
  let handleSend = () => {
    socket.emit("send-message",{input,room})
  }
  

  let joinRoom = () => {
    if (room !== "") {
      socket.emit("join-room",room)
    }
  }



  useEffect(() => {
    socket.on("receive-message", (data) => {
      setArray([...array,data])
      console.log("useEffect data...",data);
    })
  },[socket])
  console.log(socket);
  return (
    <div className="App" style={{display:"flex",justifyContent:"space-between"}}>
      <div className="userOne">
      <div className="room">
        <input placeholder="Select the room..." onChange={(e)=>setRoom(e.target.value)} type="text" name="" id="" />
        <button onClick={joinRoom}>Room</button>
      </div>
      <input placeholder="Message..." type="text" onChange={(e)=>setInput(e.target.value)} />
      <button onClick={handleSend}> Send</button>
      <div className="ui">
        {array.map(item => <p>{ item.input}</p>)}
        {/* <p>{array}</p> */}
      </div>
      </div>

  
    </div>
  );
}

export default App;
