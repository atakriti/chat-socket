import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Server } from "socket.io"
import http from "http"
let app = express()
app.use(express())
app.use(express.json())
app.use(cors())

// app.listen(4000)

let server = http.createServer(app)
let io = new Server(server, {
    cors: {
        origin:"http://localhost:3000" // the frontend localhost
    }
})

server.listen(4000, () => {
    console.log("server is running !");
})
io.on("connection", (socket) => {

    socket.on("join-room", (data) => {
        socket.join(data)
    })


    socket.on("send-message", (data) => {
      socket.to(data.room).emit("receive-message",data)
    })
})

