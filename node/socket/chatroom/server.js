'use strict'

const net = require('net');
let clients = [];

let server = net.createServer((socket) => {
	clients.push(socket);
	console.log(`Welcome ${socket.remoteAddress} to 2080 chatroom`);

	function boardcast(signal) {
		let send = {
			username: signal.username,
			message: signal.message,
			procotol: signal.procotol
		};
		// 广播信息
		clients.forEach((client) => {
			client.write(JSON.stringify(send));
		});
	}
	// 监听客户端信息
	socket.on('data',(chunk) => {
		try {
			let signal = JSON.parse(chunk.toString().trim());
			// console.log(signal);
			let procotol = signal.procotol;

			switch (procotol) {
				case 'boardcast': 
					boardcast(signal);
					break;
				// case 'p2p':
		        //   p2p(signal);
		        //   break;
		        // case 'shake':
		        //   shake(signal);
		        //   break;
		        default:
		          socket.write('弄啥咧！你要干的我干不了');
		          break;		
		    }
		}catch (error) {
			socket.write('error');
			throw error;
		}
	})
	.on('error', (err) => {
		clients = clients.splice(clients.indexOf(socket),1);
		console.log(`${socket.remoteAddress} dropped 2080 chatroom`);
	});
});

server.on('error',(err) => {
	if (err) {
		throw err;
	}
});

server.listen(2080,(err) => {
	if (err) {
		console.log('端口被占用了');
		return false;
	}
	console.log('服务器正常启动,监听2080端口');
})