const koa = require('koa');
const fs = require('fs');
const cp = require('child_process');
const Router = require('koa-router');
const static = require('koa-static');
const session = require('koa-session');

let server = new koa();
server.listen(8090);

server.keys = ['hsells', 'hoewoiuhosehu'];
server.use(session({
	key: 'ssid',
	maxAge: 20*60*1000
}, server));

let r = Router();
server.use(r.routes());

function createVerifyCode(w, h, str) {
	return new Promise((resolve, reject) => {
		cp.exec(`python 1.py ${w} ${h} ${str}`, (err) => {
			if (err) {
				reject(err);
			} else {
				fs.readFile('code.png', (err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			}
		});
	});
}
// createVerifyCode(100, 60, 'b2gs1');
r.get('/verify_code', async ctx => {
	let str = 'abcdefhjkmnpqrstuvwxyzABCDEFHJKMNPQRSTUVWXYZ12345678';
	let arr = [], len = 5;
	for (let i = 0; i < len; i++) {
		arr.push(str[Math.floor(Math.random() * str.length)])
	}
	let codeStr = arr.join('');
	let {w, h} = ctx.request.query;
	ctx.response.body = await createVerifyCode(w, h, codeStr);
	ctx.session.code = codeStr.toLowerCase();
});
r.get('/reg', async ctx => {
	let {user, pass, verify} = ctx.request.query;
	if (verify.toLowerCase() !== ctx.session.code) {
		ctx.body = 'failed';
	} else {
		ctx.body = 'success';
	}
})

server.use(static('www'));