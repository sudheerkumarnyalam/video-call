const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Health check endpoint
app.get('/', (req, res) => res.send('WebRTC signaling server is running.'));

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('join', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('offer', (offer, roomId) => {
    console.log(`Received offer from ${socket.id} for room ${roomId}`);
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', (answer, roomId) => {
    console.log(`Received answer from ${socket.id} for room ${roomId}`);
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('candidate', (candidate, roomId) => {
    console.log(`Received ICE candidate from ${socket.id} for room ${roomId}`);
    socket.to(roomId).emit('candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Global error handling
process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

server.listen(3000, () => console.log('Server listening on port 3000'));