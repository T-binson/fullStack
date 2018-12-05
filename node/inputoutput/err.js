var fs = require('fs');

// fs.readFile('1ls.js',(err) => {
// 	if (err) {console.log('1' + err);}
// });

/*try {	
	fs.readFile('1ls.js',(err) => {
		if (err) throw err;
	});
}catch(err) {
	console.log('2' + err);//无法捕获err
}*/
	
fs.readFile('1ls.js',(err) => {
	try {	
		if (err) throw err;
	}catch(err) {
		console.log('2' + err);//可以捕获err
	}
});


/*try {
	fs.readFileSync('1ls.js');
}catch(err) {
	console.log('2' + err);
}*/
