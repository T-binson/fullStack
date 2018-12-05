const urllib = require('url');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

function requestUrl(url, headers) {
	let urlObj = urllib.parse(url);
	let protocol = null;

	if (urlObj.protocol === 'http:') {
		protocol = http;
	} else if (urlObj.protocol === 'https:') {
		protocol = https;
	} else {
		throw new Error(`can not recongnized the protocol: ${urlObj.protocol}`);
	}
	return new Promise((resolve, reject) => {
		let req = protocol.request({
			host: urlObj.host,
			path: urlObj.path,
			headers: {}
		}, (res) => {
			// console.log('status:' , res.statusCode);

			if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 304) {
				let arr = [];
				res.on('data', (data) => {
					arr.push(data);
				});

				res.on('end', () => {
					let buffer = Buffer.concat(arr);
					resolve({
						statusCode: res.statusCode,
						body: buffer,
						headers: res.headers
					});
				});
			} else if (res.statusCode === 301 || res.statusCode === 302) {
				resolve({
					statusCode: res.statusCode,
					body: null,
					headers: res.headers
				});
			} else {
				reject({
					statusCode: res.statusCode,
					body: null,
					headers: res.headers
				});
			}	
		});
		req.on('error', (err) => {
			console.error(`problem with request: ${err.message}`);
		});
		req.write('');
		req.end();
	});
}

async function catchData (url, reqHeaders) {
	try {
		while (200) {
			let {statusCode, body, headers} = await requestUrl(url, reqHeaders);
			// console.log(statusCode, url);
			if (statusCode === 200) {
				return {body, headers};
			} else {
				assert(statusCode === 301 || statusCode === 302);
				assert(headers.location);
				url = headers.location;
			}
		}
	} catch (e) {
		console.log(e);
	}
}

(async () => {
	let {body, headers} = await catchData('http://tmall.com/');
	// console.log(body, headers);
	fs.writeFile(path.resolve(`./temp/tmall.html`), body, err => {
		if (err) {
			console.error(err);
		} else {
			console.log('done');
			console.log(headers);
		}
	});
})();