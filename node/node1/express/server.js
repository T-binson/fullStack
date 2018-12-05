const express = require('express');
const myloger = require('./myloger');

let server = express();
server.listen(8080);

server.use(myloger);
//api
server.get('/', (req, res) => {
	res.send('get');
});
server.post('/', (req, res) => {
	res.send('post');
});
server.use('/login', (req, res) => {
	res.send('use');
});

server.use(express.static('./www/'));