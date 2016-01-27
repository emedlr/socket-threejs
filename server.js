    /* Requires */
    var port = 8000;
    var http = require('http');
    var express = require('express'), app = express();
    var server = http.createServer(app).listen(port);
    var jade = require('jade');
    var io = require('socket.io').listen(server);

    /* App setup */
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set("view options", { layout: false });
    app.configure(function() {
       app.use(express.static(__dirname + '/public'));
    });

    /* Views */
    app.get('/', function(req, res){
      res.render('home.jade');
    });
    app.get('/three', function(req, res){
      res.render('three.jade');
    });

    /* Socket.io magic */
    io.sockets.on('connection', function (socket) {
    	socket.on('click', function (data) {
        	//console.log(data);
        	socket.emit('addClick', data);
        	socket.broadcast.emit('addClick', data);
      	});

      	socket.on('mousePos', function(data){
      		socket.broadcast.emit('drawMousePos', data);
      	});

      	socket.on('deviceOrientation', function(data){
      		socket.broadcast.emit('sendCoords', data)
      	});
        /*socket.on('video', function(data){
          socket.broadcast.emit('sendVideo', data);
        });*/
    });
