const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const request = require('./tools/request');

function html2$(buffer) {
	let document = new JSDOM(buffer).window.document;
	return document.querySelectorAll.bind(document);
}

function indexParser(buffer) {
	//jsdom
	let doc = html2$(buffer.toString());
	//NodeList
	let ul$ = html2$(doc('textarea.f1')[0].value);
	return Array.from(ul$('li')).map(li => {
		let price = li.querySelector('.mod-g-nprice');
		return {
			"href": `https:${li.querySelector('.mod-g-photo').href}`,
			"img_src": `https:${li.querySelector('img').getAttribute('data-lazyload-src')}`,
			"price": price?price.textContent : 0,
			"sales": li.querySelector('.mod-g-sales').textContent,
			"desc": li.querySelector('.mod-g-desc').textContent
		}
	});
}

(async () => {
	try {
		let {body, headers} = await request('https://shouji.tmall.com/?acm=lb-zebra-148799-667863.1003.4.708026&scm=1003.4.lb-zebra-148799-667863.OTHER_14561662186585_708026');
		let indexData = indexParser(body);
	} catch (e) {
		console.log(e);
	}
	
	async function indexprocessor(datas) {
		//storage in database
		
		//get into index data ->a link 
	}
})();

