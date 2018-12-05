const fs = require('fs');
const path = require('path');
const request = require('./tools/request');

(async () => {
	let {body, headers} = await request('https://www.zhihu.com');
	fs.writeFile(path.resolve('./temp/zhihu.html'), body, err => {
		if (err) {
			console.log(err);
		} else {
			console.log('done');
		}
	});
})();