
var http = require('http');
var path = require('path');
var URL = require('url');
var express = require('express');
var moment = require('moment');
var app = express();
app.use(express.static(__dirname));

var port = process.env.PORT || 3000;
app.get('/:key', function(req, res){
  var urltail = req.params.key;
  var unix;
  var natural;
  
  if (parseInt(urltail)>0) {
    unix = parseInt(urltail);
    natural = moment.unix(parseInt(urltail)).format("MMMM D, YYYY");
  } 
  
  else if (isNaN(urltail) && moment(urltail, "MMMM D, YYYY").isValid()) {
    unix = moment(urltail, "MMMM D, YYYY").format("X");
    natural = urltail;
  }
  
  else{
    unix = null;
    natural = null;
  }
  
  res.json({
    'unix': unix,
    'natural': natural,
  });
  
  }
  
);

app.get('/', function(req, res){
    var indexhttp = path.join(__dirname, 'index.html');
    res.send(indexhttp);
});
app.listen(port, function () {
  console.log('Node app listening on port ' + port + '!');
});
/*
var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);


router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  var askurl = URL.parse(req.url); 
  var path = askurl.path;
  console.log(path);
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
*/