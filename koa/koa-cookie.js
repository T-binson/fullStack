const koa = require('koa');
let server = new koa();
server.listen(8080);

server.keys = ['shlehoswe', 'hseosleh', 'sheose'];
server.use(async (ctx, next) => {
	// console.log(ctx.cookies);
	ctx.cookies.set('user', 'bersonte', {
		maxAge: 24 * 3600 *1000,
		path: '/aaa',	//cookie 使用路径
		domain: 'localhost',	//域名
		signed: true	//是否签名，需要配合keys,如非必要敏感信息不需要签名
	});
	console.log(ctx.cookies.get('user', {signed: true}));//获取签名的cookie
});