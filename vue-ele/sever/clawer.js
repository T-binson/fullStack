const fetch = require('./libs/fetch-html-blue');
const zlib = require('zlib');
const assert = require('assert');
const path = require('path');
const fs = require('./libs/fs');
const db = require('./libs/database');

function fetchData(options) {
	return new Promise((resolve, reject) => {
		fetch(options).then(result => {
			let {buffer, headers} = result;

			if (headers['content-length'] && headers['content-length'] != buffer.length) { //!:此处不能使用完全不等, as string/number
				reject(new Error('data is damaged'));
			} else {
				if (headers['content-encoding'] && headers['content-encoding'].split('; ').includes('gzip')) {
					zlib.gunzip(buffer, (err, data) => {
						if (err) {
							reject(err);
						} else {
							resolve(data);
						}
					});
				} else {
					resolve(buffer);
				}
			}
		}, err => {
			reject(err);
		});	
	});
}

async function getRestaurants (page=0) {
	const limit = 8;
	let offset = page * limit;
	let url = `https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=22.54286&longitude=114.059563&offset=${offset}&limit=${limit}`;
	// let url2 = 'https://h5.ele.me/pizza/shopping/restaurants/164594952/batch_shop?code=0.12796238683198502&extras=%5B%22activities%22%2C%22albums%22%2C%22license%22%2C%22identification%22%2C%22qualification%22%5D&terminal=h5&latitude=22.548703&longitude=113.882718';

	let buffer = await fetchData(url);
	let json = JSON.parse(buffer.toString());
	// console.log(json.items.length);
	let datas = json.items.map(item => {
		let restaurant = item.restaurant;
		return {
			restaurant_id: restaurant.id,
			name: restaurant.name,
			address: restaurant.address,
			distance: restaurant.distance,
			float_delivery_fee: restaurant.float_delivery_fee,
			image_path: restaurant.image_path,
			latitude: restaurant.latitude,
			longitude: restaurant.longitude,
			opening_hours: restaurant.opening_hours.join(','),
			phone: restaurant.phone,
			rating: restaurant.rating,
			rating_count: restaurant.rating_count,
			recent_order_num: restaurant.recent_order_num
		};
	});
	for (let i = 0; i < datas.length; i++) {
		let img_url = datas[i].image_path[0] + '/' + datas[i].image_path.substring(1,3)+ '/' + datas[i].image_path.substring(3);
		if (img_url.endsWith('jpeg')) {
			img_url += '.jpeg';
		} else if (img_url.endsWith('png')) {
			img_url += '.png';
		} else {
			console.log(img_url);
			assert(0);
		}
		img_url = 'https://fuss10.elemecdn.com/' + img_url;
		// console.log(img_url);
		let imgBuffer = await fetchData(img_url);
		// console.log(imgBuffer);
		await fs.writeFile(path.resolve(__dirname, './images/', datas[i].image_path), imgBuffer)
	}

	//tackle data with database
	for (let i = 0; i < datas.length; i++) {
		await db.insert('restaurant_table', datas[i]);
	}
}
function startClawRestaurant() {
	function tick() {
		for (let i = 0; i < 100; i++) {
			getRestaurants(i);
			console.log(`店铺数据: 完成了第${i}页的抓取.`);
		}
	}
	tick();
	setInterval(() => {
		tick();
	}, 3600 * 1000);
}

async function getShopDetails (id) {
	let shopUrl = `https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=${id}`;
	let buffer = await fetchData(shopUrl);
	// console.log(buffer.toString());
	let datas = JSON.parse(buffer.toString());
	datas = datas.map(item => {
		return item.foods.map(food => {
			return {
				restaurant_id: food.restaurant_id,
				item_id: food.item_id,
				name: food.name,
				description: food.description,
				tips: food.tips,
				image_path: food.image_path
			}
		})
	});
	//picture
	for (let i = 0; i < datas.length; i++) {

	}
	for (let i = 0; i < datas.length; i++) {
		for (let j = 0; j < datas[i].length; j++) {
			await db.insert('menu_table', datas[i][j]);
		}
	}
}

(async () => {
	/*for (let i = 0; i < 100; i++) {
		getRestaurants(i);
		console.log(`店铺数据: 完成了第${i}页的抓取.`);
	}*/
	await getShopDetails('160146889');
})();
