"use strict"
// 自定义一个require函数和require.cache缓存
function $require(pathname) {
	const fs = require('fs');
	const path = require('path');

	// 要加载的js完整文件路径
	let filename = path.join(__dirname,pathname);
	$require.cache = $require.cache || {};
	if ($require.cache[filename]) {
		return $require.cache[filename].exports;
	}
	let dirname = path.dirname(filename);
	// 同步读取文件
	let data = fs.readFileSync(filename,'utf8');
	// console.log(typeof data);//string
	// 3. 执行代码, 所要执行的代码 需要营造一个私有空间
	let module = {id: filename,exports: {}};
	let exports = module.exports;
	//拼接字符串 
	let code = `(function(require,module,exports,__dirname,__filename) {
		${data};
	})($require,module,exports,dirname,filename)`;
	// 执行代码
	eval(code);
	// 缓存模块
	$require.cache[filename] = module;
	//返回值
	return module.exports;
};

setInterval(() => {
	var module1 = $require('./module1.js');
	console.log(module1.getTime());
},1000);
