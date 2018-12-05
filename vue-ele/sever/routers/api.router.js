const Router = require('koa-router');
const db = require('../libs/database');
const fs = require('fs');
const uuid = require('uuid/v4');
const createVerifyCode = require('../libs/verify_code');

let router = new Router();
//tackle the OPTIONS tips
router.options('*', async ctx => {
	ctx.body = 'ok';
});

//收集数据接口
router.get('collect/:type/:data/', async (ctx, next) => {
	let  {type, data} = ctx.params;
	await db.insert('collect_table', {type, data});
	ctx.body = {code: 0, msg: 'success'};
});
//推荐店铺数据
//http://localhost:8090/api/restaurant/0/8
router.get('restaurant/:page/:size/', async (ctx, next) => {
	let {page, size} = ctx.params;
	if (isNaN(page)) {
		page = 0;
	}
	if (isNaN(size)) {
		size = 8;
	}
	ctx.body = await db.query(`select * from restaurant_table limit ${page * size}, ${size}`)
});
//http://localhost:8090/api/restaurant/03y023023y/
router.get('restaurant/:id/', async (ctx, next) => {
	let {id} = ctx.params;
	ctx.body = (await db.query(`select * from restaurant_table where restaurant_id='${id}'`))[0];
});
//商品接口
//http://localhost:8090/api/menu/268394/
router.get('menu/:restaurant_id/', async (ctx, next) => {
	let {restaurant_id} = ctx.params;
	let rows_menu = await db.select('menu_table', '*', {restaurant_id});
	let rows_food = await db.select('food_table', '*', {restaurant_id});

	let menus = [];
	rows_menu.forEach(row => {
		menus[row.menu_id] = row;
		menus[row.menu_id].foods = {};
	});

	rows_food.forEach(food => {
		menus[row.menu_id].foods[row.food_id] = row;
	});
	ctx.body = menus;
});
//购物车接口
//http://localhost:8090/api/cart/e02947452039/3/
router.post('cart/:item_id/:count/', async (ctx, next) => {
	if (!ctx.token) {
		ctx.status = 400;
		ctx.body = 'token is required';
	} else {
		let {item_id, count} = ctx.request.fields;
		let rows = await db.select('cart_table', 'ID,count', {item_id, token: ctx.token});
		//check the user is exsited or not
		if (rows.length === 0) {
			await db.insert('cart_table', {item_id, count, token: ctx.token});
			ctx.body = {error: 0, msg: 'add success'};
		} else {
			let data = rows[0];
			await db.update('cart_table', data.ID, {count: Number(data.count)+Number(count)})
			ctx.body = {error: 0, msg: 'add success'};
		}
	}
});
//delete shop items
//http://localhost:8090/api/cart/e209y540y083/
router.delete('cart/:item_id/', async (ctx, next) => {
	if (!ctx.token) {
		ctx.status = 400;
		ctx.body = 'token is required';
	} else {
		let {item_id} = ctx.params;
		await db.delete('cart_table', {item_id, token: ctx.token});
		ctx.body = {error: 0, msg: 'success'};
	}
});

//image
router.get('image/:id/', async (ctx, next) => {
	let {id} = ctx.params;
	ctx.body = fs.readFileSync(`images/${id}`);
});

//token
//http://localhost:8090/api/token
router.get('token', async (ctx, next) => {
	let token = uuid().replace(/-/g, '');
	await db.insert('token_table', {token, expires: Math.floor((Date.now() + 20 * 24 * 3600)/1000), user_id: 0});
	ctx.body = {error: 0, msg: 'success', token};
});

//code
//http://localhost:8090/api/verify_code
// createVerifyCode(100, 60, 'b2gs1');
router.get('verify_code', async ctx => {
	let str = 'abcdefhjkmnpqrstuvwxyzABCDEFHJKMNPQRSTUVWXYZ12345678';
	let arr = [], len = 5;
	for (let i = 0; i < len; i++) {
		arr.push(str[Math.floor(Math.random() * str.length)])
	}
	let codeStr = arr.join('');
	let {w, h, token} = ctx.request.query;
	ctx.response.body = await createVerifyCode(w, h, codeStr);
	await ctx.session.set(token, 'code', codeStr.toLowerCase());
});

//user for register
//http://localhost:8090/api/user/reg
router.post('user/reg', async (ctx, next) => {
	let {username, password, code} = ctx.request.fields;
	let sessionCode = await ctx.session.get(ctx.token, 'code');
	// console.log(sessionCode, code);
	if (code.toLowerCase() === sessionCode) {
		let rows = await db.select('user_table', '*', {username: username.toLowerCase()});
		if (rows.length === 0) {
			await db.insert('user_table', {username: username.toLowerCase(), password});
			ctx.body = {error: 0, msg: 'success'};
		} else {
			ctx.body = {error: 1, msg: 'username is exsited'};
		}
	} else {
		ctx.body = {error: 1, msg: 'verifycode is wrong'};
	}
});
//user for login
//http://localhost:8090/api/user/login
router.post('user/login', async (ctx, next) => {
	let {username, password} = ctx.request.fields;
	let data = await db.select('user_table', '*', {username: username.toLowerCase()});
	if (data.length === 0) {
		ctx.body = {error: 1, msg: 'username is not existed'};
	} else if (data[0].password !== password) {
		ctx.body = {error: 1, msg: 'username or password is fault'};
	} else {
		let res = await db.select('token_table', 'ID', {token: ctx.token});
		let user_id = data[0].ID, token_id = res[0].ID;
		await db.update('token_table', token_id, {user_id});
		ctx.body = {error: 0, msg: 'login success'};
	}
});

module.exports = router.routes();