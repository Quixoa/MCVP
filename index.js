var app = require('express').createServer();
var io = require('socket.io')(app);

app.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


// var express = require('express');
// var io = require('socket.io');
// var app = express();

// app.set('port', (process.env.PORT || 5000));


// app.get('/', function(request, response) {
//   response.send("<h1>Main View go to /host<br>Device go to /player<h1>");

// });

// app.get('/host', function(request, response) {
//   response.send("<h1>HOST DEVICE<h1>");
// });

// app.get('/player', function(request, response) {
//   response.send("<h1>PLAYER<h1>");
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
