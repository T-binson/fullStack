'use strict'

const [fs,path,readline] = [require('fs'),require('path'),require('readline')];

let streamReader = fs.createReadStream(path.join(__dirname,'./vitas.lrc'));

let rl = readline.createInterface({input: streamReader});

const reg = /\[(\d{2})\:(\d{2})\.(\d{2})\](\s*.+)/;
let begin = new Date().getTime();

rl.on('line',(input) => {
		let lyric = reg.exec(input);
		// console.log(lyric);
		if (lyric) {
			let [min,sec,mis,ly] = [parseFloat(lyric[1]),parseFloat(lyric[2]),parseFloat(lyric[3]),lyric[4]];
			// console.log(min,sec,mis,ly);
			let offset = new Date().getTime() - begin; //时间偏移量
			// console.log(offset);
			setTimeout(() => {
				console.log(ly);
			},min*60*1000+sec*1000+mis - offset);
		}else {
			console.log(input);
		}
});