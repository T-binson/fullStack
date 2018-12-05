const express = require('express');
const router_user = require('./routers/user');

let server = express();
server.listen(8080);

// let router_user = express.Router();
server.use('/user', router_user);

/*router_user.get('/', (req, res) => {
	res.send('user');
});
router_user.get('/login', (req, res) => {
	res.send('login');
});
router_user.get('/reg', (req, res) => {
	res.send('reg');
});
let router_vip = express.Router();
router_user.use('/vip', router_vip);
router_vip.get('/', (req, res) => {
	res.send('vip');
});*/

// let router_article = express.Router();
server.use('/article', require('./routers/article'));
/*router_article.get('/', (req, res) => {
	res.send('article');
});*/


