/*var a = require("abc");//require("包名称")，通过查找包的名称去加载包里面的入口文件
console.log(a);*/

// var fn = () => 2;

var rf = require('readfile');
rf('./package.json',function(err,data) {
	console.log(data);
});