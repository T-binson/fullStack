const mod1 = (function () {
				const module = {};
				module.exports = {};

				let a = 10, b = 12;
module.exports = a + b;

				return module.exports;
			})();
const mod2 = (function () {
				const module = {};
				module.exports = {};

				function show (a) {
	return a + 2;
}

module.exports = {
	show()
}

exports.c = 21;

				return module.exports;
			})();

console.log(a + b);