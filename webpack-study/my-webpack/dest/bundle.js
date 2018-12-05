const mod1 = (function () {
				const module = {};
				module.exports = {};

				let a = 10;
module.exports = {a};

				return module.exports;
			})();
const mod2 = (function () {
				const module = {};
				module.exports = {};

				function show (a) {
	return a + 2;
}
module.exports = {
	b: show(8)
}
exports.c = 21;

				return module.exports;
			})();

console.log(mod1.a + mod2.b);