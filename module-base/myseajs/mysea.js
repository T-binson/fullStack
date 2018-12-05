const sea = {
	use(path, fn_end) {
		let res = this.ajax(path);
		function define(fn) {
			let module = {
				exports: {}
			}
			function require(path) {
				let res = this.ajax(path);
				/*let str = res.match(/require\(.+\)/g);
				if (str.length > 0) {
					let paths = str.map(function(item) {
						let temp = item.match(/(\'|\").+(\'|\")/);
						return temp[0].substring(1,temp[0].length -1);
					})
					let json = [];
					str.forEach(function(item) {
						this.ajax(item)
					})
				}*/
				eval(res);	
			}
			fn(require, module.exports, module);
			if (fn_end) {
				fn_end(module.exports);
			} else {
				return module.exports;
			}
		}
		eval(res);
	},
	ajax(path) {
		let data = null;
		let xml = new XMLHttpRequest();
		xml.open('GET', path, true);
		xml.send();
		xml.onreadystatechange = function() {
			if (xml.readyState === 4) {
				if (xml.status >= 200 && xml.status < 300 || xml.status === 304) {
					data = xml.responseText;
				}
			}
		}
		return data;
	}
}；