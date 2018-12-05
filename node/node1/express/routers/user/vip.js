const express = require('express');
let router_vip = express.Router();
router_vip.get('/', (req, res) => {
	res.send('vip');
});
module.exports = router_vip;
