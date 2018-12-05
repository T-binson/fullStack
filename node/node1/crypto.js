const crypto = require('crypto');

let hash = crypto.createHash('md5');

hash.update('abcd');
hash.update('efg');

console.log(hash.digest('hex'));