const myKoa = require('my-koa');

let server = new myKoa();
server.listen(8080);

server.use(async (ctx, next) => {
	console.log('a');
	await next();
	console.log('c');
});

server.use(async (ctx, next) => {
	console.log('b');
});