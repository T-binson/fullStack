'use strict'

// const fs = require('fs');
// const path = require('path');
const [fs,path] = [require('fs'),require('path')];

/*console.time('sync');
fs.readFileSync('./path.js','utf8');
console.timeEnd('sync');*/

console.time('async');
fs.readFile('./basename.js','utf8',(error,data) => {
	if (error) {
		throw error;
	}
	console.log('success!');
})
console.timeEnd('async');
