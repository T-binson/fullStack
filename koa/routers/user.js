const router = require('koa-router');

let r1 = router();

r1.get('/reg', async (ctx, next) => {
	ctx.response.body = 'register';
});

r1.get('/login', async (ctx, next) => {
	ctx.response.body = 'login';
});

module.exports = r1.routes();