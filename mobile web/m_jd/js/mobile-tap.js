function tap(element,callback) {
	var startTime,
		maxtime =250,
		isMove = false;

	element.addEventListener("touchstart",function(e) {
		startTime = Date.now();
		isMove = false;
	});

	element.addEventListener("touchmove",function(e) {
		isMove = true;
	});

	element.addEventListener("touchend",function(e) {
		if (isMove === true) {
			// console.log("移动了");
			return;
		}
		if((Date.now() - startTime) > maxtime) {
			// console.log(Date.now() - startTime);
			return;
		}
		callback(e);
	});
}

