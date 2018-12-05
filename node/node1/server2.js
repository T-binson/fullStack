const http = require('http');
const fs = require('fs');

let httpServer = http.createServer((req, res) => {
	fs.readFile(`.${req.url}`, (err, data) => {
		if (err) {
			fs.readFile('./404.html', (err, data) => {
				if (err) {
					res.writeHeader(404);
					res.write('404');
				} else {
					res.write(data);
				}
				res.end();
			})
		} else {
			res.write(data);
			res.end();
		}
	})
});
httpServer.listen(3000);