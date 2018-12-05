const urllib = require('url');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

let req = http.request('http://www.baidu.com/', (res) => {
	console.log('status:' , res.statusCode);

	if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 304) {
		let arr = [];
		res.on('data', (data) => {
			arr.push(data);
		});

		res.on('end', () => {
			let buffer = Buffer.concat(arr);
			fs.writeFile(path.resolve('./temp/baidu.html'), buffer, (err) => {
				if (err) {
					console.error('write file failed', err);
				} else {
					console.log('done:', buffer);
				}
			});
		});
	}	
});

req.on('error', (err) => {
	console.error(`problem with request: ${err.message}`);
});
req.write('');
req.end();