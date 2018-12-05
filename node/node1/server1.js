const http = require('http');
const fs = require('fs');

let httpServer = http.createServer((req, res) => {
	fs.readFile(`.${req.url}`, (err, data) => {
		if (err) {
			res.writeHeader(404);
			res.write('404, Not Found');
		} else {
			res.write(data);
		}
		res.end();
	})
});
httpServer.listen(3000);
