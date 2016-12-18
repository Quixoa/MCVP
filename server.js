'use strict';

var express = require('express');
var socketIO = require('socket.io');
var path = require('path');

var PORT = process.env.PORT || 3000;
var INDEX = path.join(__dirname, 'index.html');

var server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

var io = socketIO(server);
var users = 0;
io.on('connection', (socket) => {
  console.log('Client connected');
  users = users+1;
  io.emit('con',users);
  socket.on('disconnect', () => console.log('Client disconnected'));
});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
