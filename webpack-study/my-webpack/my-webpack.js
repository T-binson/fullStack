const path = require('path');
const process = require('process');
const fs = require('fs');

let config = null;

// console.log(process);
function cwd(str) {
	return path.resolve(process.cwd(), str);
}

try {
	config = require(cwd('./my-webpack.config'));
} catch(e) {
	console.log('can not find my-webpack.config.js');
}

if (!config) {
	return;
}

if (!config.entry) {
	console.log('can not find the entry config');
}
if (!config.output) {
	console.log('can not find the output config');
}

for (let key in config.entry) {
	let filename = config.entry[key];
	try {
		let buffer = fs.readFileSync(cwd(filename));
		let str = buffer.toString();
		let result = str.replace(/require\([^\(\)]+\)/g, (s) => {
			let p = s.replace(/require/g, '');
			let filename = eval(p);
			// console.log(filename);
			let content = '';
			try {
				content = fs.readFileSync(cwd(filename)+'.js');
			} catch (e) {
				try {
					content = fs.readFileSync(cwd(filename));
				} catch (e) {
					try {
						content = fs.readFileSync(cwd(filename)+'.json');
					} catch (e) {
						throw new Error(`can not find the ${filename}`);
					}
				}
			}
			return `(function () {
				const module = {};
				module.exports = {};

				${content.toString()}

				return module.exports;
			})()`;
		}).replace(/import\s+\w+\s+from\s+[\'\"\']?[^\'\"\']+[\'\"\']?/, (str) => {
			let arr = str.split(/\s+/g);
			// console.log(arr);
			let var_name = arr[1];
			let p = arr[arr.length - 1];
			let filename = eval(p);
			let content = '';
			try {
				content = fs.readFileSync(cwd(filename)+'.js');
			} catch (e) {
				try {
					content = fs.readFileSync(cwd(filename));
				} catch (e) {
					try {
						content = fs.readFileSync(cwd(filename)+'.ts');
					} catch (e) {
						throw new Error(`can not find the ${filename}`);
					}
				}
			}
			return `const ${var_name} = (function () {
				const module = {};
				module.exports = {};

				${content.toString()}

				return module.exports;
			})()`;
		});
		// 如果还有更多嵌套引用，封装函数使用递归解决
		// console.log(result);
		let json = path.parse(config.output.path);
		// console.log(json);
		try {
			fs.mkdirSync(json.base);
		} catch (e) {}
		fs.writeFileSync(json.base + '/' + config.output.filename, result);
		console.log('read successfully');
	} catch (e) {
		// throw new Error(e);
		console.log(`can not find the ${filename}`);
	}
}
