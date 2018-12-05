const fs = require('fs');
module.exports = function(req, res, next) {
	//ip,time, method, address
	// console.log(req.connection);
	let arr = [];
	let oDate = new Date();
	arr.push(`[${oDate.toGMTString()}]`);
	arr.push(req.method);
	arr.push(req.url);

	fs.appendFile('./logs/access.log', arr.join(' ') + '\n', (err) => {
		if (err) {
			console.log('write logs fail');
		} else {
			next();
		}
	});
}