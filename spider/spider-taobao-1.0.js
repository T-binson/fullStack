const urllib = require('url');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

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
		let {statusCode, body, headers} = await requestUrl(url, reqHeaders);
		console.log(statusCode, body, headers);
		if (statusCode === 200) {
			return {body, headers};
		} else {
			let {statusCode, body, headers: headers1} = await requestUrl(headers.location, reqHeaders);
			console.log(statusCode, body, headers1);
		}
	} catch (e) {
		console.log(e);
	}
}

catchData('http://tmall.com');