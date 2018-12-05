const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router');

let server = new koa();
server.listen(8080);

server.use(async (ctx, next) => {
	let start = new Date.getTime();
	await next();
	console.log(`${new Date().getTime() - start}`);
});

server.use(async (ctx, next) => {
	try {
		await next();
	} catch(e) {
		console.log(e.name);//about error message
		ctx.response.body = '404';
	}
});

server.use(static('www'));

