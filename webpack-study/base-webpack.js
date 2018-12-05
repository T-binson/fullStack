const path = require('path');

module.exports = {
	entry: {
		base: './src/1',
		more: './src/more-entry'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve('dist')
	}
}