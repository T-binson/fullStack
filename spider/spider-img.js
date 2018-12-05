const fs = require('fs');
const path = require('path');
const request = require('./tools/request');

(async () => {
	let {body, headers} = await request('https://img.alicdn.com/tfs/TB19NPfm1uSBuNjy1XcXXcYjFXa-1230-260.jpg');
	fs.writeFile(path.resolve('./temp/tmall.jpg'), body, err => {
		if (err) {
			console.log(err);
		} else {
			console.log('done');
		}
	});
})();