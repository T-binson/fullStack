const express = require('express');

let server = express();
server.listen(8080);

server.get('/duck', (req, res, next) => {
	res.redirect('https://www.duckduckgo.com/');
});