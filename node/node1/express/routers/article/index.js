const express = require('express');

let router_article = express.Router();

router_article.get('/', (req, res) => {
	res.send('article');
});

module.exports = router_article;