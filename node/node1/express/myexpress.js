const http = require('http');
const assert = require('assert');
const url = require('url');

module.exports = function() {
	let queue = [];
	let server = http.createServer((req, res) => {
		let {pathname, query} = url.parse(req.url, true);
		req.query = query
		res.send = function(any) {
			//Buffer
			//string
			//json
			//arr
			if (any instanceof Buffer || typeof any === 'string') {
				res.write(any);
			} else {
				res.write(JSON.stringify(any));
			}
		}
		_run(0);
		function _run(n) {
			for (let i = n; i < queue.length; i++) {
				if (queue[i].path === pathname || queue[i].path === '*') {
					queue[i].fn(req, res, () => {
						_run(n+1);
					});
				}
				break;
			}
		}
	});
	server.get = function() {
		assert(arguments.length === 2 || arguments.length === 1, 'arguments error');
		let path, fn;
		if (arguments.length === 2) {
			path = arguments[0];
			fn = arguments[1];
		} else if (arguments.length === 1) {
			fn = arguments[0];
			path = '*';
		}
		queue.push({path, fn});
	}

	return server;
}