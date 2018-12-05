const net = require('net');
const assert = require('assert');
let host = 'smtp.163.com', port = 25;
let user = 'bersonte@163.com', pass = '';
let receiver = 'gdpu10_222@sina.cn';

function mail_sender (host, port, user, pass, receiver, content) {
	return new Promise((resolve, reject) => {
		let client = net.createConnection({
			host, port
		}, () => {
			console.log('connected');
			try {
				(async () => {
					let code;
					code = await getData();
					assert(code === 220);
					sendData(`HELO ${host}`);

					code = await getData();
					assert(code === 250);
					sendData(`auth login`);

					code = await getData();
					assert(code === 334);
					sendData(new Buffer(user).toString('base64'));

					code = await getData();
					assert(code === 334);
					sendData(new Buffer(pass).toString('base64'));

					code = await getData();
					assert(code === 235);
					sendData(`MAIL FROM: <${user}>`);

					code = await getData();
					assert(code === 250);
					sendData(`RCPT T0: <${receiver}>`);

					code = await getData();
					assert(code === 250);
					sendData(`DATA`);

					code = await getData();
					assert(code === 354);
					sendData(`${content}\r\n.`);

					sendData('QUIT');

					resolve();
				})();
			} catch (e) {
				reject(e);
			}
		});

		function getData() {
			return new Promise((resolve, reject) => {
				next();
				function next() {
					if (data) {
						let tmp = data;
						data = null;
						resolve(parseInt(tmp.toString()));
					} else {
						setTimeout(next, 0);
					}
				}
			})
		}

		function sendDate(data) {
			console.log('send', data);
			client.write(data+'\r\n');
		}
		let data = null;
		client.on('data', d => {
			console.log(d.toString());
			data = d;
		});

		client.on('end', () => {
			console.log('connection broke down');
		});
	});
}