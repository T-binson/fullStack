const http = require('http');
const url = require('url');
const fs = require('fs');
const cluster = require('cluster');
const os = require('os');
const processes = require('process');

if (cluster.isMaster) {
		for (let i = 0; i < os.cpus().length; i++) {
			cluster.fork();
		}
} else {
	http.createServer((req, res) => {
		let {pathname, query} = url.parse(req.url, true);
		console.log('process: ', processes.pid);
		let rs = fs.createReadStream(`.${pathname}`);
		rs.pipe(res);
		rs.on('error', (err) => {
			res.writeHeader(404);
			res.write('not found');
			res.end();
		})
	}).listen(3000);
}