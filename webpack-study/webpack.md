#webpack用法——webpack.config.js
##最少entry,output
	entry: '要打包的文件地址'
	output: {
		path: path.resolve(dir目录),
		filename: '打包后的name'
	}
	执行打包主要依赖于package.json中scripts的配置，如：
	command: npm run webpack

##more entries多入口
	entry: {
		自定义名字： '打包的文件一',
		自定义名字： '打包的文件二'
	}
	output: {
		path: path.resolve(dir目录),
		filename: '[name]xxx'
	}

##dev-serve
	npm install webpack webpack-cli webpack-dev-server -D

	plugins: [
		// 引入热更新模块
		new Webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.resolve('public'),
		port: 8090,	//端口
		hot: true,	//开启热更新
		historyApiFallback: true //回滚到首页(默认页)
	}

##babel
	npm install babel-core babel-loader babel-preset-env -D
##ts-loader
	npm install ts-loader typescript -D
##css-loader
	npm install css-loader -D
##image
	npm install file-loader image-webpack-loader -D
##vue
	npm i vue-loader vue-template-loader vue-style-loader vue-template-compiler -D

----------------------------------------------------------
##vue-cli(refer to vue)
	dependencies:
		webpack webpack-cli webpack-dev-server
		babel-core babel-loader babel-preset-env
		ts-loader typescript
		css-loader
		file-loader image-webapck-loader
		vue-loader vue-template-loader vue-style-loader vue-template-compiler