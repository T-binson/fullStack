const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);
server.use(cookieParser(['shhsoelsheo'
]));

server.get('/', (req, res, next) => {
	console.log(req.cookies);
	console.log(req.signedCookies);
	res.cookie('pass', 12345, {
		//domain
		//expires: date
		//maxAge: int
		//path
		//secrect: true
		signed: true
	});
	res.end();
});