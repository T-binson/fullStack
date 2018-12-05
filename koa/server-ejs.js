const koa = require('koa');
const ejs = require('koa-ejs');
const mysql = require('./libs/koa-better-mysql');

let server = new koa();
server.listen(8080);

ejs(server, {
	root: './template',
	layout: false,
	viewExt: 'ejs',
	cache: false,
	debug: true
});

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'an_ju_ke'
});
server.use(async (ctx, next) => {
	await ctx.render('index', {
		houses: await db.query('select * from house_table');
	});
});