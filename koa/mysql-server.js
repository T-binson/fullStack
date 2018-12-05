const koa = require('koa');
const convert = require('koa-convert');
const mysql = require('./libs/koa-better-mysql');

let server = new koa();
server.listen(8080);

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',
	database: 'an_ju_ke'
});

server.use(async (ctx, next) => {
	let data = await db.query('select * from house_table');
	ctx.response.body = data;
})