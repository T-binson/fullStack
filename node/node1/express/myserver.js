const myexpress = require('./myexpress');
const myloger = require('./myloger');

let server = myexpress();
server.listen(8080);

server.get(myloger);

server.get('/', (req, res, next) => {
	console.log('aaa');
	res.send('get');
	next();
});

server.get('/', (req, res, next) => {
	console.log('bbb');
	res.send('slhos');
	res.end();
});