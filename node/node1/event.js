const Event = require('events').EventEmitter;
let ev = new Event();

ev.on('emit', (a,b,c,d) => {
	console.log(a, b, c, d);
});
ev.on('emit', a => {
	console.log(a);
})

ev.emit('emit', 12, 5, 2, 1);