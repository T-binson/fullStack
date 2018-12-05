const fs = require('fs');

var rf = function() {
	return new Promise(function(resolve,reject) {
		fs.readFile('../01hello.js','utf8',function(err,data) {
			if (err) {
				reject(err);
			}else {
				resolve(data);
			}

		});
	});
};

rf().then(function(data) {
	console.log(data);
},function(err) {
	console.log(err);
});