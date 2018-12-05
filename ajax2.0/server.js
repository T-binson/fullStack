const express = require('express');
const multer = require('multer');

let multerObj = multer({dest: './www/upload/'});

let server = express();
server.listen(3000);

server.use(multerObj.any());

server.post('/upload', (req, res) => {
	console.log(req.files);
	res.send('ok');
});

server.use(express.static('./www/'));