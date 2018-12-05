const cluster = require('cluster');
const os = require('os');
const process = require('process');
// judging if it is mian process
if (cluster.isMaster) {
	for(let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}
	console.log('main process');
} else {
	console.log(`child process: ${process.pid}`);
}