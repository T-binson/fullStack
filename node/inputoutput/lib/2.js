var fs = require('fs');

/*var rf = function(path,callback) {
	
	// fs.readFile(path,'utf8',(err,data) => {
	// 	callback(data);
	// });

	// console.log(__dirname + path);
	fs.readFile(__dirname + path,'utf8',(err,data) => {
		callback(data);
	});
};*/

var path = require('path');
var rf = function(paths,callback) {
	
	fs.readFile(path.join(__dirname,paths),'utf8',(err,data) => {
		callback(data);
	});
};

module.exports = rf;