'use strict'

const net = require('net');
// 创建一个socket客户端
const socket = net.connect({port: 2080}, () => {
	// 监听与服务器端发生连接时获取相关信息
	console.log('conneted to server!');
	process.stdout.write('client>>');
	process.stdin.on('data', (chunk) => {
		socket.write(chunk.toString());
	});

	// 监听socket有数据过来
	socket.on('data', (data) => {
		console.log(data.toString());
		// socket.end();
		process.stdout.write('client>>');
	});
});
