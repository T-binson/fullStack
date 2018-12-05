const koa = require('koa');
const route = require('koa-route');
const static = require('koa-static');

let server = new koa();
server.listen(8080);

server.use(route.get('/a', async (ctx, next) => {
	ctx.response.body = 'abc';
	// next();
}));
server.use(route.get('/reg/:user/:pass', async (ctx, user, pass, next) => {
	console.log(user, pass);
}));

server.use(route.get('/reg', async (ctx, next) => {
	console.log(ctx.request.query);
}));

server.use(static('www'));