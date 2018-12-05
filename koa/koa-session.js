const koa = require('koa');
const koaSession = require('koa-session');

let server = new koa();
server.listen(8080);
server.keys = ['shlsheo', 'sheojewo', 'lahowe'];
server.use(koaSession({
	maxAge: 'session'	//'session||number'
}, server));

server.use(async (ctx, next) => {
	if (!ctx.session['n']) {
		ctx.session['n'] = 1;
	} else {
		ctx.session['n']++;
	}
	console.log(ctx.session);
	ctx.response.body = ctx.session['n'];
});