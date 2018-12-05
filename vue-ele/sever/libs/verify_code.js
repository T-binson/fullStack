const fs = require('fs');
const cp = require('child_process');

function createVerifyCode(w, h, str) {
	return new Promise((resolve, reject) => {
		cp.exec(`python 1.py ${w} ${h} ${str}`, (err) => {
			if (err) {
				reject(err);
			} else {
				fs.readFile('code.png', (err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			}
		});
	});
}

module.exports = createVerifyCode;