define(function(require, exports, module) {
	// exports.a = 12;

	module.exports = {
		a: 12,
		b: 6,
		add() {
			return this.a + this.b;
		}
	}
})