const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');

//setHeader 可以重复设置，主要应用于设置响应头信息，不再在writeHeader后设置，否则无效报错
//writeHeader 只能设置一次
let server = http.createServer((req, res) => {
	let {pathname, query} = url.parse(req.url, true);
	res.setHeader('Content-Encoding', 'gzip');
	let rs = fs.createReadStream(`.${pathname}`);
	let gz = zlib.Gzip();
	rs.pipe(gz).pipe(res);
	rs.on('error', err => {
		if (err) {
			res.writeHeader(404);
			res.write('not found');
			res.end();
		}
	})
}).listen(3000);