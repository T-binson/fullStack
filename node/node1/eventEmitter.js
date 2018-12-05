const Event = require('events').EventEmitter;

let ev = new Event();
// console.log(ev);

ev.on('blue', (a, b) => {
	console.log(a, b);
});
ev.on('blue', (a, b) => {
	console.log(b, a);
});

let res = ev.emit('blue', 12, 4);
console.log(res);//true|false