const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http'); 
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/UserRoutes');
const messageRoute = require('./routes/MessagesRoute');

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoute);

const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chat';

async function main() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully');
  } catch (err) {
    console.error(err);
  }
}
main();

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.resolve(__dirname, 'client', 'build');

  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Running');
  });
}

const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', 
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message);
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
