const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');

let db = mysql.createPool({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: '20181019'
});

let httpServer = http.createServer((req, res) => {
	// console.log(url.parse(req.url, true));
	let {pathname, query} = url.parse(req.url, true);
	if (pathname === '/reg') {
		// console.log('register');
		let {user, pass} = query;
		//校验数据
		if (!/^\w{6,32}$/.test(user)) {
			res.write(JSON.stringify({code: 1, msg: 'username is not right'}));
			res.end();
		} else if (!/^.{6,32}$/.test(pass)) {
			res.write(JSON.stringify({code: 1, msg: 'password is not right'}));
			res.end();
		} else {
			db.query(`select * from user_table where username="${user}"`, (err, data) => {
				if (err) {
					res.write(JSON.stringify({code: 1, msg: 'database has some problems1'}));
					res.end();
				} else if (data.length > 0) {
					res.write(JSON.stringify({code: 1, msg: 'the user is exsisted'}));
					res.end();
				} else {
					db.query(`insert into user_table (username, password, online) values("${user}", "${pass}", 0)`, (err) => {
						if (err) {
							res.write(JSON.stringify({code: 1, msg: 'database has some problems2'}));
							res.end();
						} else {
							res.write(JSON.stringify({code: 0, msg: 'register successfully'}));
							res.end();
						}
					})
				}
			})
		}
	} else if (pathname === '/login') {
		// console.log('login');
		let {user, pass} = query;
		if (!/^\w{6,32}$/.test(user)) {
			res.write(JSON.stringify({code: 1, msg: 'username is not right'}));
			res.end();
		} else if (!/^.{6,32}$/.test(pass)) {
			res.write(JSON.stringify({code: 1, msg: 'password is not right'}));
			res.end();
		} else {
			db.query(`select ID,password from user_table where username="${user}"`, (err, data) => {
				if (err) {
					res.write(JSON.stringify({code: 1, msg: 'database has some problems'}));
					res.end();
				} else if (data.length === 0) {
					res.write(JSON.stringify({code: 1, msg: 'user is not exsisted'}));
					res.end();
				} else if (data[0].password !== pass) {
					res.write(JSON.stringify({code: 1, msg: 'user or password is not matched'}));
					res.end();
				} else {
					db.query(`update user_table set online=1 where ID=${data[0].ID}`, (err) => {
						if (err) {
							res.write(JSON.stringify({code: 1, msg: 'login failedly'}));
							res.end();
						} else {
							res.write(JSON.stringify({code: 0, msg: 'login successfully'}));
							res.end();
						}
					})
				}
			})
		}
	} else {
		fs.readFile(`www${req.url}`, (err, data) => {
			if (err) {
				res.writeHeader(404);
				res.write('404, not found!');
			} else {
				res.write(data);
			}
			res.end();
		});
	}
});
httpServer.listen(3000);