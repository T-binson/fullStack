const express = require('express');
const server = express();
server.listen(3000);

server.get('/', (req, res, next) => {
	console.log('first');
	next();
});
server.get('/', (req, res) => {
	console.log('second');
});