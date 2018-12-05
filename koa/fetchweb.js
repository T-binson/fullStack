const http = require('http');

let client = http.request({
	host: 'www.baidu.com',
	port: 80,
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
	},
	pathname: '/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&ch=&tn=baidu&bar=&wd=shuangshiyi&rn=&oq=&rsv_pq=b0ada65800091971&rsv_t=de6cBViwuJ%2Fj7F3RioFpLPgCyh5%2B%2FGoNbBWPr%2BsUAqWTY%2FY%2FVbb7sfIEcrg&rqlang=cn'
}, res => {
	let str = '';
	res.on('data', data => {
		str += data;
	});
	res.on('end', () => {
		console.log(str);
	});
	res.on('error', err => {
		console.log('error');
	});
});
client.end();