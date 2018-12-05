const express = require('express');
const mysql = require('mysql');
const uuid = require('uuid/v4');
const crypto = require('crypto');
let server = express();
server.listen(3000);

const db = mysql.createPool({
	localhost: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: '20181105'
});

//check the reg info
server.get('/reg', (req, res, next) => {
	let {user, pass} = req.query;
	if (!user) {
		res.send('username can not be empty');
	} else if (!pass) {
		res.send({code: 1, msg: 'password can not be empty'});
	} else if (!/^\w{6,32}$/.test(user)) {
		res.send({code: 1, msg: 'username is 6-32 bit'});
	} else if (!/^.{6,32}$/.test(pass)) {
		res.send({code: 1, msg: 'password is 6-32 bit'});
	} else {
		next();
	}
});
//check the reg info is exsisted or not
server.get('/reg', (req, res, next) => {
	let {user, pass} = req.query;
	db.query(`select * from user_table where username="${user}"`, (err, data) => {
		if (err) {
			res.send({code: 1, msg: 'database has some problems1'});
		} else if (data.length > 0) {
			res.send({code: 1, msg: 'username has been exsisted'});
		} else {
			next();
		}
	});
});
server.get('/reg', (req, res, next) => {
	renext();
	function renext() {
		let id = uuid().replace(/\-/g, '');
		db.query(`select * from user_table where ID="${id}"`, (err, data) => {
			if (err) {
				res.send({code: 1, msg: 'database has some problems0'});
			} else if (data.length > 0) {
				renext();
			} else {
				req._uuid = id;
				next();
			}
		});
	}
});
//insert into database
server.get('/reg', (req, res) => {
	let {user, pass} = req.query;
	let md5 = crypto.createHash('md5');
	md5.update(pass);
	pass = md5.digest('hex');
	db.query(`insert into user_table (ID, username, password) values("${req._uuid}", "${user}", "${pass}")`, (err, data) => {
		if (err) {
			res.send({code: 1, msg: 'database has some problems2'});
		} else {
			res.send({code: 0, msg: 'register successfully'});
		}
	});
});