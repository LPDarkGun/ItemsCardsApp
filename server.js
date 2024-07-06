const express = require('express');
const http = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  // Attach io instance to the server
  server.all('*', (req, res) => {
    res.socket.server.io = io;
    handle(req, res);
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Custom events
    socket.on('itemUpdated', (data) => {
      io.emit('itemUpdated', data);
    });
  });

  httpServer.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
  });
});
