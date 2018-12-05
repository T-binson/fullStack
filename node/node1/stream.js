const fs = require('fs');
let rs = fs.createReadStream('./1.html');
let ws = fs.createWriteStream('./2.html');
rs.pipe(ws);

rs.on('error', err => {
	console.log('read failed');
});

rs.on('end', () => {
	console.log('finished reading');
});

ws.on('error', err => {
	console.log('write failed');
});
//not end event like rs, it's finish
ws.on('finish', () => {
	console.log('finished writing');
});

