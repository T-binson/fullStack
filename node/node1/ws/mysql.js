const mysql = require('mysql');

// let db = mysql.createConnection({host: 'xxx.com', port: '3306', user: '**', password: '***', database: 'xxx'})
let db = mysql.createPool({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: '20181019'
});
// console.log(db);
// 增删改查
// 增： INSERT INTO 表(字段列表) VALUES(值)
//			INSERT INTO user_table (username,password,online) VALUES('Ronbin','1122',0);
// 删：	DELETE FROM 表 WHERE 条件
// 			DELETE FROM user_table WHERE ID=4;
// 改：	UPDATE 表 SET 字段=新值,字段=新值... WHERE 条件;
// 			UPDATE user_table SET `password`='abc432' WHERE ID=2;
// 查：	SELECT 字段 FROM 表 WHERE 条件;
// 			SELECT username,`online` FROM user_table WHERE ID=5;
db.query('SELECT * FROM user_table', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
})