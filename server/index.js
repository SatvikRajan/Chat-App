const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('../server/routes/UserRoutes');
const messageRoute = require('./routes/MessagesRoute');
const socket = require('socket.io');
require("dotenv").config();
app.use(cors())
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

async function main() {
    try {
        await mongoose.connect('mongodb+srv://satvikrajan:Satvik2003@cluster0.lowxabl.mongodb.net/chat-app?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

main().catch((err) => {
    console.log(err);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: ['https://chat-app-2cih.onrender.com'],
        credentials: true
    }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.message);
        }
    });
});