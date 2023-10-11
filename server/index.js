const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('../server/routes/UserRoutes')
const messageRoute = require('./routes/MessagesRoute')
const socket = require('socket.io')
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoute)
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chat');
    console.log('DB connected succesfully')
}
main() .catch((err)=>{
    console.log(err)
})
const server = app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
const io = socket(server,{
  cors:{origin:'https://vercel.com/satvikrajan/chat-app/BJusvcBUu6VfcEhY69TkPNQYrERv',
  credentials: true}
})

global.onlineUsers = new Map()
io.on('connection',socket=>{
  global.chatSocket = socket;
  socket.on('add-user',(userId)=>{
    onlineUsers.set(userId,socket.id)
  })
  socket.on("send-msg",(data)=>{
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket){
      socket.to(sendUserSocket).emit('msg-recieve',data.message)
    }
  })
})