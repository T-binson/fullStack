const koa = require('koa');
const static = require('koa-static');

let server = new koa();
server.listen(8080);

//jiekou

//static files
server.use(static('www'));
