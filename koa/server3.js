const koa = require('koa');
const router = require('koa-router');
const static = require('koa-static');

let server = new koa();
server.listen(8080);

let r1 = router();
server.use(r1.routes());

r1.get('/a', async (ctx, next) => {
	ctx.response.body = 'bac';
});
r1.get('/b/:user/:id', async (ctx, next) => {
	ctx.response.body = ctx.params;
});

r1.use('/user', require('./routers/user'));

server.use(static('www'));