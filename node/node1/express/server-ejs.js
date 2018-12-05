const express = require('express');
const consolidate = require('consolidate');
const mysql = require('mysql');

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
	db.query('select * from user_table', (err, data) => {
		if (err) {
			console.log('database has some problems1');
			res.sendStatus(500, 'database breakdown');
			res.end();
		} else {
			res.render('3', {arr: data, nav: ['home', 'news', 'sports', 'study', 'about']})
		}
	})
});