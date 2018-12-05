const http = require('http');
const socket = require('socket.io');

//create server
let server = http.createServer();
server.listen(8080);

// let wsServer = socket.listen(server);
let wsServer = socket(server);
//listen connection
wsServer.on('connection', (sock) => {
	//listen message
	sock.on('ms', (num1, num2) => {
		console.log(num1, num2);
	});
	//send message
	setInterval(function() {
		sock.emit('random', Math.random());
	}, 1000)
})