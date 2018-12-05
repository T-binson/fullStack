'use strict'

const fs = require('fs');
const path = require('path');

let filename = path.join(__dirname,process.argv[2] || './file.js');
fs.watchFile(filename,(curr,prev) => {
	console.log(`curr: ${curr.size}`,`prev: ${prev.size}`);
});