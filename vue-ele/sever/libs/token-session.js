const redis = require('redis');
const config = require('../config');

let client = redis.createClient({
	host: config.REDIS_HOST,
	port: config.REDIS_PORT,
	password: config.REDIS_PASS
});

module.exports = function () {
	return {
		set(token, key, val) {
			return new Promise((resolve, reject) => {
				client.set(`${token}_${key}`, val, (err, msg) => {
					if (err) {
						reject(err);
					} else {
						resolve(msg);
					}
				})
			})
		},
		get(token, key) {
			return new Promise((resolve, reject) => {
				client.get(`${token}_${key}`, (err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				})
			})
		}
	}
};