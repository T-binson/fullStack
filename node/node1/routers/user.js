const router = require('../router');
let users = {};

router.on('/login', (req, res) => {
	let {user, pass} = req.query;
	if (!users[user]) {
		res.send({code: 1, msg: 'username is not exsisted'});
		res.end();
	} else if(users[user] !== pass) {
		res.send({code: 1, msg: 'user or password is not right'});
		res.end();
	} else {
		res.send({code: 0, msg: 'login successfully'});
		res.end();
	}
});

router.on('/reg', (req, res) => {
	let {user, pass} = req.query;
	if (users[user]) {
		res.send({code: 1, msg: 'username has been used'});
		res.end();
	} else {
		users[user] = pass;
		res.send({code: 0, msg: 'register successfully'});
		res.end();
	}
});