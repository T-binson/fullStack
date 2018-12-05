const path = require('path');
const Webpack = require('webpack');

module.exports = {
	entry: './src/index',
	output: {
		filename: 'bundle1.js',
		path: path.resolve('dist')
	},
	plugins: [
		// 引入热更新模块
		new Webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.resolve('public'),
		port: 8090,	//端口
		hot: true,	//开启热更新
		historyApiFallback: true //回滚到首页(默认页)
	},
	// 指定需要额外处理格式的文件后缀
	resolve: {
		extensions: [".ts", ".tsx"]
	}
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: 'node_modules',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['ES2015']
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'}
				]
			},
			{
				test: /\.(jpg|jpeg|png|gif|icon|bmp)/i,
				use: ['file-loader']
			}
		]
	}
}