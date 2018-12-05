const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');

fs.readFile('./temp/taobao.html', (err, data) => {
	if (err) {
		console.error(err);
	} else {
		let html = data.toString();

		//jsdom
		let jsdom = new JSDOM(html);
		let doc = jsdom.window.document;
		//NodeList
		let alinks = doc.querySelectorAll('a');
		alinks = Array.from(alinks).map(link => {
			return link.textContent;
		});
		console.log(alinks);
	}
});
