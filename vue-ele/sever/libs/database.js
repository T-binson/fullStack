const mysql = require('mysql');
const config = require('../config');
const assert = require('assert');

let db = mysql.createPool({
	host: config.DB_HOST,
	port: config.DB_PORT,
	user: config.DB_USER,
	password: config.DB_PASS,
	database: config.DB_NAME
});
function filterValue(json) {
	return json.toString().replace(/'/g, "\\'").replace(/"/g, '\\\"');
}
db._query = db.query;
db.query = function (sql) {
	return new Promise((resolve, reject) => {
		db._query(sql, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

//1.convenient
db.insert = function (table, data) {
	let keys = [], vals = [];
	for (let key in data) {
		keys.push(key);
		vals.push(`\'${filterValue(data[key])}\'`);
	}
	// console.log(vals);
	return db.query(`insert into ${table} (${keys.join(',')}) values(${vals.join(',')})`);
};
db.delete = function (table, where) {
	assert(where);
	assert(typeof where === 'object');
	let arr = [];
	for (let key in where) {
		arr.push(`${key}='${filterValue(where[key])}'`);
	}
	where = arr.join(' and ');
	return db._query(`delete from ${table} where ${where}`);
};

db.update = function (table, ID, data) {
	let arr = [];
	for (let key in data) {
		arr.push(`${key}='${filterValue(data[key])}'`);
	}
	return db._query(`update ${table} set ${arr.join(',')} where ID=${ID}`);
};
//check the id
db.select = function (table, fields, where) {
	if (!where) {
		where = '1=1';
	} else {
		let arr = [];
		for (let key in where) {
			arr.push(`${key}='${filterValue(where[key])}'`);
		}
		where = arr.join(' and ');
	}
	return db.query(`select ${fields} from ${table} where ${where}`);
};

module.exports = db;