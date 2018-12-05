const http = require('http');
let server = http.createServer(function(request, response) {
	// console.log('requiring...');
	
	console.log(request.url);
	console.log(request.method);

	response.write('aaa');
	response.end();
});
server.listen(3000);

// console.log('listen successfully');
