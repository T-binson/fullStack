let _imgs = null;
let _resource = {
	fish1: 'img/fish1.png',
	fish2: 'img/fish2.png',
	fish3: 'img/fish3.png',
	fish4: 'img/fish4.png',
	fish5: 'img/fish5.png',
	coin1: 'img/coinAni1.png',
	coin2: 'img/coinAni2.png',
	cannon1: 'img/cannon1.png',
	cannon2: 'img/cannon2.png',
	cannon3: 'img/cannon3.png',
	cannon4: 'img/cannon4.png',
	cannon5: 'img/cannon5.png',
	cannon6: 'img/cannon6.png',
	cannon7: 'img/cannon7.png',
	tower: 'img/bottom.png',
	bullet: 'img/bullet.png',
	number: 'img/number_black.png'
};

function loadImgs(json, fn) {
	let total = 0, res = {}, complete = 0;
	for( let img in json) {
		total++
		let oImg = new Image();
		res[img] = oImg;
		oImg.src = json[img];
		oImg.onload = function() {
			complete++
			if (total === complete) {
				_imgs = res;
				fn(_imgs);
			}
		};
		oImg.onerror = function() {
			alert('images loaded failed');
		};
	}	
}
function d2a(deg) {
	return deg * Math.PI/180;
}
function a2d(arc) {
	return arc * 180/Math.PI;
}

function rnd(m, n) {
	return Math.floor(Math.random() * (n - m)+m);
}