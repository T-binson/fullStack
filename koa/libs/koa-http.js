const http = require('http');
const url = require('url');

module.exports = function (str) {
	return new Promise((resolve, reject) => {
		let client = http.request({url.parse(str, true)}}, res => {
			let content = [];
			res.on('data', data => {
				content.push(data);
			});
			res.on('end', () => {
				resolve(Buffer.concat(content));
			});
			res.on('error', err => {
				reject(err);
			});
		});
		client.end();
	});
};
