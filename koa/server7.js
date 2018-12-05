const koa = require('koa');
const betterBody = require('koa-better-body');
const koaConvert = require('koa-convert');

let server = new koa();
server.listen(8080);

//get data
// server.use(async (ctx, next) => {
// 	console.log(ctx.request.query);
// });

//post data
server.use(koaConvert(betterBody({
	uploadDir: './upload/',
	keepExtensions: true
})));
server.use(async (ctx, next) => {
	// console.log(ctx.request);
	// console.log(ctx.request.body);	//buffer
	// console.log(ctx.request.files);	//files
	console.log(ctx.request.fields);	//all data
});