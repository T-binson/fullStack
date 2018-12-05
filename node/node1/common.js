Buffer.prototype.split = Buffer.prototype.split || function(spliter) {
	let b1 = this, result = [], n;
	while((n=b1.indexOf(spliter)) !== -1) {
		let res1 = b1.slice(0, n);
		let res2 = b1.slice(n+spliter.length);
		result.push(res1);
		b1 = res2;
	}
	result.push(b1);
	return result;
}

exports.parseInfo = function (str) {
	let arr = str.split('; ');
	let arr2 = [];
	arr.forEach(item => {
		let a = item.split('\r\n');
		arr2 = arr2.concat(a);
	})
	let json = {};
	arr2.forEach(item => {
		let [key, value] = item.split('=');
		if (value) {
			json[key] = value.substring(1, value.length - 1);
		} else {
			json[key] = value;
		}
	});
	return json;
}