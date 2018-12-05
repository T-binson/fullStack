const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router');
const myStatic = require('./libs/my-static');

let server = new koa();
server.listen(8080);

/*server.use(async (ctx, next) => {
	console.log(ctx.req);	//node's
	console.log(ctx.request); //koa's
});*/

/*server.use(async (ctx, next) => {
	ctx.response.body = await new Promise((resolve, reject) => {
		//因为以下操作为异步操作，因此需要使用promise来包装
		fs.readFile(`./www${ctx.request.path}`, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
});*/

// server.use(static('www'));

server.use(myStatic('www'));
