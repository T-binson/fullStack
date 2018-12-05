'use strict'

const http = require('http');
const fs = require('fs');
const querystring = require('querystring')
const url = require('url');

var server = http.createServer();

server.on('request',(request,response) => {
	var urlObj = url.parse(request.url,true);
	// console.log(urlObj.pathname);
	// console.log(urlObj.query);
	var pathname = urlObj.pathname;
	var query = urlObj.query;

	if (pathname === '/test.html' && request.method === 'GET') {
		fs.readFile('./test.html','utf8',(err,data) => {
			response.end(data);
		});
	}else if (pathname === '/test.js' && request.method === 'GET') {
		fs.readFile('./test.js','utf8',(err,data) => {
			response.end(data);
		});
	}else if(pathname == '/post' && request.method === 'POST') {
		// console.log(request.url);
		var data = "";
		request.on('data',function(chunk) {
			data += chunk;
		});
		request.on('end',function() {
			console.log(data);
			var dataobj = querystring.parse(data);
			console.log(dataobj);
			response.end('123');//第一个参数必须为字符串或buffer
		});
	}
});
server.listen(3001);