define(function(require, exports, module) {
	exports.a = 12;
	exports.b = 6;
	let {num1} = require('./mod2.js');
	let {num2} = require("./mod3");
	exports.sum = num1 + num2;
})