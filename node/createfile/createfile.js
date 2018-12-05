'use strict'

const fs = require('fs');
const path = require('path');


function createfile(pathname,dirN,callback) {
	pathname = path.isAbsolute(pathname)?pathname:path.join(dirN,pathname);
	// console.log(pathname);
	let relfile = path.relative(dirN,pathname);
	// console.log(relfile);
	let files = relfile.split(path.sep);
	
	try {
		let dirname = '';
		files.forEach((item) => {
			try {
				fs.statSync(path.join(dirN,dirname,item));
			}catch(error) {
				fs.mkdirSync(path.join(dirN,dirname,item));
			}
			dirname = dirname  + path.sep + item;
			// dirname = path.join(dirname,path.sep,item);
			// console.log(dirname);	
			}
		);
	}catch (error) {
		callback(error);
	}
	
};

/*createfile('f3\\f4\\f5',(error) => {
	console.log(error);
});*/

/*createfile('f1/f2/f3',(error) => {
	console.log(error);
});*/

/*createfile('./f1/f2/f3',(error) => {
	console.log(error);
});*/

module.exports = createfile;