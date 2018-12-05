'use strict'

/*const fs = require('fs');

const rs = fs.createReadStream('./promise.js');

const ws = fs.createWriteStream('./promiste-stream.js');

rs.pipe(ws);*/

const fs = require('fs');

const rs = fs.createReadStream('./9css.avi');

const ws = fs.createWriteStream('./9css-1.avi');

/*fs.stat('./9css.avi',function(err,data) {
	console.log(data.size);
	var len = [];
	rs.on('data',function(chunk) {
		len.push(chunk);
		// console.log(len.length/data.size);

	})
});*/

var stats = fs.statSync('./9css.avi');

var count = stats.size;

var len = 0;

rs.on('data',function(chunk) {
	len += chunk.length;
	console.log(parseFloat(len/count * 100).toFixed(2)+ '%');
	ws.write(chunk);
});

rs.on('end',function() {
	console.log('end~~~');
	ws.end();
});


