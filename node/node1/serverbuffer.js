const http = require('http');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const path = require('path');
const common = require('./common');

let server = http.createServer((req, res) => {
	//get method data
	let {pathname, query} = url.parse(req.url, true);
	// console.log(pathname, query);
	let aBuffer = [];
	req.on('data', data => {
		// console.log(data.toString());
		aBuffer.push(data);
	});
	req.on('end', () => {
		let data = Buffer.concat(aBuffer);
		let post = null;
		if (req.headers['content-type'].startsWith('multipart/form-data')) {
			let post = {}, files = {};
			//提取分隔符
			let boundary ='--' + req.headers['content-type'].split(';')[1].split('=')[1];
			//用分隔符分切数据
			let arr = data.split(boundary);
			//扔掉头尾
			arr.shift(),arr.pop();
			//扔掉每一项头尾的\r\n
			arr = arr.map(item => item.slice(2, item.length - 2));
			//找到每一项的第一个\r\n\r\n，然后分切成两部分，前为信息，后为数据
			arr.forEach(item => {
				let n = item.indexOf('\r\n\r\n');
				let total = 0, complete = 0;
				if (n !== -1) {
					let info = item.slice(0, n).toString();
					let data = item.slice(n + 4);
					if (info.indexOf('\r\n') === -1) {
						//普通数据
						let json = common.parseInfo(info);
						let key = json.name;
						// let value = json[key];
						let val = data.toString();
						post[key] = val;
					} else {
						//文件数据
						total++;
						let json = common.parseInfo(info);
						let key = json.name;
						let filename = json.filename;
						let type = json['Content-Type'];
						let val = data;
						let newFilename = `./upload/${uuidv4().replace(/\-/g, '')}${path.extname(filename)}`;
						files[key] = {filename, type, newFilename};
						fs.writeFile(newFilename, data, (err) => {
							if (err) {
								console.log('write failed');
							} else {
								complete++;
								console.log('write successfully');
							}
						});

					}
				}
			})
		} else {
			//urlencoded data
			const post = queryString.parse(data.toString());
		}
		// console.log(post);
	});
});
server.listen(3000);

/*
------WebKitFormBoundary9azO3d3wAAsEbUyh\r\n
Content-Disposition: form-data; name="user"\r\n
\r\n
bersonte\r\n
------WebKitFormBoundary9azO3d3wAAsEbUyh\r\n
Content-Disposition: form-data; name="pass"\r\n
\r\n
hoseowe\r\n
------WebKitFormBoundary9azO3d3wAAsEbUyh\r\n
Content-Disposition: form-data; name="f1"; filename="2.txt"\r\n
Content-Type: text/plain\r\n
\r\n
hshs\r\n
------WebKitFormBoundary9azO3d3wAAsEbUyh--
*/