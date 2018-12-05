const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const mybodyParser = require('./mybody-parser');

let server = express();
server.listen(3000);

// server.use(bodyParser.urlencoded({}));
server.use(mybodyParser.urlencoded);

server.post('/login', (req, res) => {
	console.log(req.body);
});