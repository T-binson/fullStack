let b1 = new Buffer('shs==hsoe==sheiowe==shdk');
// let n = b1.indexOf('==');
// let res1 = b1.slice(0, n);
// let res2 = b1.slice(n+2);
// console.log(res2, res1);

let data = [];
function buff(b, spliter) {
	if (b.indexOf(spliter) !== -1) {
		let n = b.indexOf(spliter);
		let res1 = b.slice(0, n);
		let res2 = b.slice(n+2);
		data.push(res1);
		buff(res2, spliter);
	} else {
		data.push(b);
	}
};
buff(b1, '==');
console.log(data);

/*Buffer.prototype.split = Buffer.prototype.split || function(spliter) {
	let b1 = this, result = [], n;
	while((n=b1.indexOf(spliter)) !== -1) {
		let res1 = b1.slice(0, n);
		let res2 = b1.slice(n+2);
		result.push(res1);
		b1 = res2;
	}
	result.push(b1);
	return result;
}
console.log(b1.split('=='));*/