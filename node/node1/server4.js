const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const router = require('./router');
const user = require('./routers/user');

http.createServer((req, res) => {
	let {pathname, query} = url.parse(req.url, true);
	req.query = query;
	res.send = function(data) {
		if (!(data instanceof Buffer) && typeof data !== 'string') {
			data = JSON.stringify(data);
		}
		res.write(data);
	}
	//judge the pathname is api or not
	if (!router.emit(pathname, req, res)) {
		let rs = fs.createReadStream(pathname);
		res.setHeader('Content-Encoding', 'gzip');
		rs.pipe(zlib.createGzip()).pipe(res);
		rs.on('error', (err) => {
			if (err) {
				console.log('not found');
				res.writeHeader(404);
				res.write('not found');
			}
		})
	} else {
		res.end();
	}
}).listen(3000);