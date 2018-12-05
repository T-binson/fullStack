const koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const db = require('./libs/database');
const config = require('./config');
const path = require('path');
const url = require('url');
const betterBody = require('koa-better-body');
const convert = require('koa-convert');
const tokeSession = require('./libs/token-session');

let server = new koa();
server.listen(config.PORT);

server.use(convert(betterBody()));

server.use(async (ctx, next) => {
	// if (ctx.request.headers['origin'] && url.parse(ctx.request.headers['origin']).hostname === 'localhost') {
		ctx.session = tokeSession();
		ctx.set({'Access-Control-Allow-Origin': '*'});
		ctx.set({'Access-Control-Allow-Headers': '*'});
		let token = ctx.request.headers['x-token'];
		if (token) {
			let res = await db.select('token_table', '*', {token});
			if (res.length === 0) {
				ctx.status = 400;
			} else {
				ctx.token = token;
				await next();
			}
		} else {
			await next()
		}
	// }
});

let router = new Router();
router.use('/api/', require('./routers/api.router'));
server.use(router.routes());


server.use(static(path.resolve(__dirname, 'www/')));