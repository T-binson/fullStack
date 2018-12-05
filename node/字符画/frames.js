var frames = [];

/*frames[frames.length] = `
(-ω- )`;
frames[frames.length] = `
(+ω+)`;
frames[frames.length] = `
(*ω* )`;
frames[frames.length] = `
( ^ω^)`;
frames[frames.length] = `
(;ω;)`;
frames[frames.length] = `
(。ω。)`;*/
const fs = require('fs');
for(let i = 1;i<7;i++) {
	frames[frames.length] = fs.readFileSync(`./frames${i}.txt`.'utf8');
}

var index = 0,
	fps = 10;
var render = () => {
	process.stdout.write('\033[0f');
	process.stdout.write('\033[2j');
	if (index === frames.length) {
		index = 0;
	};
	// process.stdout.write(frames[index++]);
	console.log(frames[index++]);
};
setInterval(render,1000/fps);