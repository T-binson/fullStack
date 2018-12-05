const express = require('express');
const path = require('path');

let server = express();
server.listen(8080);

server.get('/1.txt', (req, res, next) => {
	if (req.query['pass'] === '12345') {
		res.sendFile(path.resolve('./static/1.txt'));
		res.end();
	} else {
		res.sendStatus(403);
		res.end();
	}
})