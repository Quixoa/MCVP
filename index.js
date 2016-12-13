var express = require('express');
var io = require('socket.io');
var app = express();

app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
  response.send("HI");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
