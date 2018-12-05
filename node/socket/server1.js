'use strict'

const net = require('net');
// 创建一个socket服务器
let server = net.createServer((socket) => {
	// 监听与客户端发生连接时获取相关信息
	// console.log(`hello ${socket.remoteAddress}:${socket.remotePort} coming`);
	// 监听socket有数据过来
	socket.on('data',(chunk) => {
		console.log(chunk.toString().trim());
		socket.write('you coming');
	});
});
// 错误处理
server.on('error',(err) => {
	throw err;
});

let port = 2080;
server.listen(port,(error) => {
	if (error) {
		console.log('端口被占用');
	}
});
