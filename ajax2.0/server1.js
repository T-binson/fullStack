const http = require('http');
const fs = require('fs');
const url = require('url');
const uuidv4 = require('uuid/v4');

let server = http.createServer((req, res) => {
	let {pathname, query} = url.parse(req.url);
	if (pathname === '/upload_base64') {
		let str = '';
		req.on('data', (data) => {
			str+=data;
		});
		req.on('end', () => {
			// console.log(decodeURIComponent(str));
			let baseurl = (decodeURIComponent(str)).replace(/data:[a-z\-]+(\/[a-z\-]+)?;base64,/i, '');
			// console.log(baseurl);
			fs.writeFile(`./www/upload/${uuidv4().replace(/\-/g, '')}`, baseurl, 'base64', (err) => {
				if (err) {
					res.writeHeader(500);
					res.write('sever write fail');
				} else {
					res.write('ok');
				}
				res.end();
			})
		})
	} else {
		fs.readFile(`./www/upload${pathname}`, (err, data) => {
			if (err) {
				console.log(err);
				res.writeHeader(404);
				res.write('not found');
			} else {
				res.write(data);
			}
			res.end();
		})
	}
});
server.listen(3000);