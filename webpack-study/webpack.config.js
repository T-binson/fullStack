module.exports = {
	entry: `${__dirname}/src/index.js`,
	output: {
		filename: 'bundle.js',
		path: `${__dirname}/dist`
	},
	devServer: {
		contentBase: './dist/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'}
				]
			},
			{
				test: /\.(jpg|jpeg|png|git|ico|bmp)/i,
				use: ['file-loader']
			}
		]
	}
}