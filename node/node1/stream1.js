const fs = require('fs');
const zlib = require('zlib');

let gz = zlib.createGzip();

let rs = fs.createReadStream('./1.html');
let ws = fs.createWriteStream('./3.html.gz');

rs.pipe(gz).pipe(ws);
