'use strict'

const http = require('http');

const server = http.createServer();

server.on('request',function(request,response) {
	// console.log(response);
	// console.log(request.httpVersion);
	// console.log(request.method);
	console.log(request.url);//注意url的文件路径
	// response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
	// response.write('<h1>hello world!</h1>');
	// response.end('haha~~');

	if(request.url === '/news.html' && request.method === 'GET') {
		response.end('<p>news</p>');
	}else if(request.url === '/login' && request.method === 'POST') {
		response.end('<h1>success</h1>');
	}
});
server.listen(3000);