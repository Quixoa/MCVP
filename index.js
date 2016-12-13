// var express = require('express');
// var io = require('socket.io');
// var app = express();

// app.set('port', (process.env.PORT || 5000));


// app.get('/', function(request, response) {
//   response.send("HI");
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
