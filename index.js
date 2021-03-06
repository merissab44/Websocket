const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//Notifies socket when a user connects
io.on('connection', (socket) => {
  console.log('a user connected');

  //Notifies socket when a user disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('user disconnected');
    });
    //shows message to the chat
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});