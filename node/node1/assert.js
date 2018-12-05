const assert = require('assert');

let divide = (function (a, b) {
	assert(typeof a === 'number' && typeof b === 'number', 'a,b must be number');
	assert(b !== 0, 'b can not be zero');
	return a/b;
}(12, '2'));
console.log(divide);