const net = require('net');
const crypto = require('crypto');

//tcp server
net.createServer(socket => {
	// console.log(socket);
	console.log('someone connnets me');
	socket.once('data', (data) => {
		// console.log(data);//buffer data
		// console.log(data.toString());
		// 处理第一次连接的请求头
		let str = data.toString();
		str = str.split('\r\n');
		str.shift();
		str.pop();
		str.pop();
		// console.log(str);
		let headers = {};
		str.forEach((header) => {
			let [key, value] = header.split(': ');
			headers[key] = value;
		});
		// console.log(headers);
		//校验头
		if (headers['Connection'] !== 'Upgrade' || headers['Upgrade'] !== 'websocket') {
			console.log('it is not websocket protocols');
			socket.end();
		} else {
			if (headers['Sec-WebSocket-Version'] !== '13') {
				console.log('it is another websocket version');
				socket.end();
			} else {
				let hash = crypto.createHash('sha1');
				hash.update(headers['Sec-WebSocket-Key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
				let base64key = hash.digest('base64');
				socket.write(
					`HTTP/1.1 101 Switching protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${base64key}\r\n\r\n`
				);
				console.log('finish connection');
			}
			socket.on('data', (data) => {
				//客户端发送过来的信息
				console.log(data);
			});
		}
	});


	socket.on('end', () => {
		console.log('connection ends');
	});
}).listen(3000);