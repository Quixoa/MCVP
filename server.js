'use strict';

var express = require('express');
var socketIO = require('socket.io');
var path = require('path');

var PORT = process.env.PORT || 3000;
var INDEX = path.join(__dirname, 'index.html');
var CLIENTPATH = path.join(__dirname, 'client.html');
var HOSTPATH = path.join(__dirname, 'host.html');

var data = {
  'clients': 0,
  'host': false,
  'hostIDs':[],
  'totalConnections':0,
  'clientIDs':[],
  'test': function() {
    console.log('test');
  }
};


var server = express()
  .get('/',(req, res) => res.sendFile(INDEX))
  .get('/client',(req, res) => res.sendFile(CLIENTPATH))
  .get('/host',(req, res) => res.sendFile(HOSTPATH))
  .use("/styles",express.static(__dirname + "/styles"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



var io = socketIO(server);



io.on('connection', (socket) => {
  data.totalConnections = data.totalConnections+1;

  socket.on('clientConnected',function(id){
    data.clientIDs.push(id);
    data.clients = data.clients + 1;

  });

  socket.on('hostConnected',function(id){
    data.hostIDs.push(id);
    data.host = true;

  });



  socket.on('disconnect',function(){
    if(data.clientIDs.includes(socket.id)){
        var index = data.clientIDs.indexOf(socket.id);
        array.splice(index, 1);
    }
    data.totalConnections = data.totalConnections-1
  });



});


setInterval(() => io.emit('tick', data, 1000));
