const fs = require('fs');
fs.readFile('1.txt', (err, data) => {
	if(err) {
		console.log(err);
	} else {
		console.log(data);
	}
})
fs.writeFile('2.txt', 'hshs', err => {
	if(err) {
		console.log(err);
	} else {
		console.log('success')
	}
})
