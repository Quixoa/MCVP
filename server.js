'use strict';

var express = require('express');
var socketIO = require('socket.io');
var path = require('path');

var PORT = process.env.PORT || 3000;
var INDEX = path.join(__dirname, 'index.html');

var server = express();

server.use((req, res) => res.sendFile(INDEX));  
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
