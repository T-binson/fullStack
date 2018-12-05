process.stdin.setEncoding('utf8');

var users = {
	'admin': 12345,
	'user1': 123,
	'user2': 1122
};

// 注意换行
let q = 'Please input your name: \n';
let pwd = 'Please input your password: \n';
let username = '';
process.stdout.write(q);

process.stdin.on('data',(data) => {
	//data is an Object
	data = data.toString().trim();
	// 判断用户名是否存在
	if(!username) {
		if (Object.keys(users).indexOf(data) === -1) {
			process.stdout.write('the user is not exist!\n');
			process.stdout.write(q);
			username = '';
		}else {
			process.stdout.write(pwd);
			username = data;
		}
	}else {
		// console.log(users[username],data);
		if(data === users[username].toString()) {
				process.stdout.write('Success!\n');
				// username = ''; //测试多个用户输入
		}else {
			process.stdout.write(pwd);
		}
	}
	
})