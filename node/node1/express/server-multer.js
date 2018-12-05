const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let server = express();
server.listen(8080);

let multerObj = multer({dest: './upload/'});
server.use(multerObj.any());
server.use(bodyParser.urlencoded({extended: false}));

server.post('/upload', (req, res, next) => {
	// console.log(req.files);
	let i = 0;
	_next(i);
	function _next(i) {
		let newfilename = req.files[i].path + path.extname(req.files[i].originalname);
		fs.rename(req.files[i].path, newfilename, (err) => {
			if (err) {
				res.sendStatus(500, 'rename error');
			} else {
				i++;
				if (i >= req.files.length) {
					res.send('upload ok');
					res.end();
				} else {
					_next();
				}
			}
		})
	}
});