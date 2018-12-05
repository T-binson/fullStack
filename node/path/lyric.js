'use strict'

const [fs,path] = [require('fs'),require('path')];

fs.readFile(path.join(__dirname,'./vitas.lrc'),(error,data) => {
	if (error) {
		throw error;
	}
	let lyrics = data.toString().split('\r\n');
	// console.log(lyrics.length);
	const reg = /\[(\d{2})\:(\d{2})\.(\d{2})\](\s*.+)/;
	let begin = new Date().getTime();
	lyrics.forEach((item) => {
		let lyric = reg.exec(item);
		// console.log(lyric);
		if (lyric) {
			let [min,sec,mis,ly] = [parseFloat(lyric[1]),parseFloat(lyric[2]),parseFloat(lyric[3]),lyric[4]];
			// console.log(min,sec,mis,ly);
			let offset = new Date().getTime() - begin; //时间偏移量
			console.log(offset);
			setTimeout(() => {
				console.log(ly);
			},min*60*1000+sec*1000+mis - offset);
		}else {
			console.log(item);
		}
		
	})
});