const express = require('express');
const consolidate = require('consolidate');
const ejs = require('ejs');
const mysql = require('mysql');
const fs = require('fs');

let server = express();
server.listen(8080);
let db = mysql.createPool({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: '20181105'
});

server.engine('html', consolidate.ejs);
server.set('view engine', 'ejs');
server.set('views', './template');

server.get('/', (req, res) => {
	res.render('1', {arr: [1,2,3,4,5]});
});

server.get('/user', (req, res) => {
	res.render('2', {arr: [
		{name: 'ejs', age: 5},
		{name: 'pug', age: 3},
		{name: 'jade', age: 4},
		{name: 'express', age: 7}
	]});
});

server.get('/usertable', (req, res) => {
	fs.stat('.render-cache/3', (err) => {
		// 利用时间戳更新缓存
		let oDate = new Date();
		oDate.setTime(oDate.getTime() - 10*60*1000);
		// 判断是否有错或者已过有效期
		if (err || stat.ctime.getTime() < oDate.getTime()) {
			renderAndWrite();
		} else {
			let rs = fs.createReadStream('./render-cache/3');
			rs.pipe(res);
			rs.on('error', (err) => {
				renderAndWrite();
			});
		}
	});
	function renderAndWrite() {
		db.query('select * from user_table', (err, data) => {
			if (err) {
				console.log('database has some problems1');
				res.sendStatus(500);
				res.end();
			} else {
				ejs.renderFile('./template/3.ejs', {arr: data, nav: ['home', 'news', 'sports', 'study', 'about']}, (err, result) => {
						fs.writeFile('./render-cache/3', result, err => {
							res.send(result);
							res.end();
						});	
				});
			}
		});
	}
});