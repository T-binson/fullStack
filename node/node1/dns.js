const dns = require('dns');
//explain domain to ip
dns.lookup('www.google.com', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});

//explain ip to domain
/*dns.lookupService('222.76.214.60', 80, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});*/