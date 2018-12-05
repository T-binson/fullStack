const express = require('express');
const sessionCookie = require('cookie-session');

let server = express();
server.listen(8080);

server.use(sessionCookie({
	secret: 'sheoslhsoer'
}));

server.get('/', (req, res, next) => {
	// console.log(req.session);
	// req.session['value'] = 999;
	if (req.session['count']) {
		req.session['count']++;
	} else {
		req.session['count'] = 1;
	}
	res.send(`Welcome to you, you are the number ${req.session['count']} visitor`);
	res.end();
});