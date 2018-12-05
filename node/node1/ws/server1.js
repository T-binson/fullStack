const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const socket = require('socket.io');

let db = mysql.createPool({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: '20181019'
});

let httpServer = http.createServer((req, res) => {
	fs.readFile(`www${req.url}`, (err, data) => {
		if (err) {
			res.writeHeader(404);
			res.write('404, not found');
		} else {
			res.write(data);
		}
		res.end();
	})
});
httpServer.listen(3001);

let wsServer = socket(httpServer);
let sockusers = [];
wsServer.on('connection', (sock) => {
	let cur_username = '', cur_userId = 0;
	//register
	sock.on('reg', (user, pass) => {
		if (!/^\w{6,32}$/.test(user)) {
			sock.emit('reg_ret', 1, 'username is not right');
		} else if (!/^.{6,32}$/.test(pass)) {
			sock.emit('reg_ret', 1, 'password is not right');
		} else {
			db.query(`select ID from user_table where username="${user}"`, (err, data) => {
				if (err) {
					sock.emit('reg_ret', 1, 'database has problem1');
				} else if (data.length > 0) {
					sock.emit('reg_ret', 1, 'username is exsisted');
				} else {
					db.query(`insert into user_table (username, password, online) values("${user}","${pass}",0)`, (err) => {
						if (err) {
							sock.emit('reg_ret', 1, 'database has problem2');
						} else {
							sock.emit('reg_ret', 0, 'register successfully');
						}
					})
				}
			})
		}
	});
	//login
	sock.on('login', (user, pass) => {
		if (!/^\w{6,32}$/.test(user)) {
			sock.emit('login_ret', 1, 'username is not right');
		} else if (!/^.{6,32}$/.test(pass)) {
			sock.emit('login_ret', 1, 'password is not right');
		} else {
			db.query(`select ID,password from user_table where username="${user}"`, (err, data) => {
				if (err) {
					sock.emit('login_ret', 1, 'database has problem1');
				} else if (data.length === 0) {
					sock.emit('login_ret', 1, 'username is not exsisted');
				} else if (data[0].password !== pass) {
					sock.emit('login_ret', 1, 'username or password is not matched');
				} else{
					db.query(`update user_table set online=1 where ID=${data[0].ID}`, (err) => {
						if (err) {
							sock.emit('login_ret', 1, 'database has problem2');
						} else {
							sock.emit('login_ret', 0, 'login successfully');
							cur_username = user;
							cur_userId = data[0].ID;
						}
					})
				}
			})
		}
	});
	//send messages
	sock.on('msg', (username, txt) => {
		if (!txt) {
			sock.emit('msg_ret', 1, 'the message is empty');
		} else {
			sockusers.forEach((item) => {
				if (item === sock)return;
				item.emit('msg', username, txt)
			})
			sock.emit('msg_ret', 0, 'send successfully');
			sockusers.push(sock);
		}
	})
	sock.on('disconnect', () => {
		db.query(`update user_table set online=0 where ID=${cur_userId}`, (err) => {
			if (err) {
				console.log('database error: ',err);
			}
			cur_username = '';
			cur_userId = 0;
			sockusers = sockusers.filter(item => item !== sock);
		})
	})
})