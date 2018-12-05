'use strict'

let createfile = require('./createfile.js');

createfile('./f1/f1/f2',__dirname,(error) => {
	throw error;
});