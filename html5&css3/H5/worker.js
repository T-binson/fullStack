this.onmessage = function(ev) {
	console.log(ev, ev.data);
	let sum = parseInt(ev.data.n1) + parseInt(ev.data.n2);
	this.postMessage(sum);
}