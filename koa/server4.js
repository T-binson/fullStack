const koa = require('koa');

let server = new koa();
server.listen(8080);

server.use(async (ctx, next) => {
	console.log('1');
	await next();
	console.log('3');
});

server.use(async (ctx, next) => {
	console.log('2');
});
