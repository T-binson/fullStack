class Myscroll {
	constructor(selector, options={}) {
		//handle default options		
		function option(options, defaults) {
			for(let key in defaults) {
				if (typeof options[key] === 'undefined') {
					options[key] = defaults[key];
				}
			}
		}
		option(options, {
			bounce: true,
			bounceTime: 600,
			scrollX: false,
			scrollY: true,
			freeScroll: false,
			startX: 0,
			startY: 0,
			directionLockThreshold: 5
		});

		this.eventQueue = [];
		let parents = Array.from(document.querySelectorAll(selector));
		parents.forEach((parent) => {
			let child = parent.children[0];
			if (!child) {return;}

			child.addEventListener('touchstart', start, false);
			child.addEventListener('touchmove', move, false);
			child.addEventListener('touchend', end, false);

			let startx = 0,
					starty = 0,
					contentx = 0,
					contenty = 0,
					threshold = options.directionLockThreshold,
					translateX = options.startX,
					translateY = options.startY,
					dir = '';
			let _this = this;
			let firstMove = false;
			// console.log(_this); //instance of Myscroll
			child.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;

			function start(e) {
				e.preventDefault();
				// console.log('start');
				startx = e.targetTouches[0].clientX;
				starty = e.targetTouches[0].clientY;
				contentx = e.targetTouches[0].clientX - translateX;
				contenty = e.targetTouches[0].clientY - translateY;
				//notice the direction
				dir = '';
				firstMove = true;

				//judge eventListener
				_this.eventQueue.forEach((json) => {
					if (json.type === 'beforeScrollStart') {
						json.fn();
					}
				});
			}
			function move(e) {
				e.preventDefault();
				if (firstMove) {
					firstMove = false;
					_this.eventQueue.forEach(json => {
						if (json.type === 'scrollStart') {
							json.fn();
						}
					})
				}

				let disx = e.targetTouches[0].clientX - startx;
				let disy = e.targetTouches[0].clientY - starty;
				if (!dir) {
					if (Math.abs(disx) > threshold) {
						dir = 'x';
					} else if (Math.abs(disy) > threshold) {
						dir = 'y';
					}
				} else {
					if (options.scrollX || options.freeScroll) {
						if (dir === 'x') {
							translateX = e.targetTouches[0].clientX - contentx;
							if (!options.bounce) {
								if (translateX > 0) {
									translateX = 0;
								}
								if (translateX < parent.offsetWidth - child.offsetWidth) {
									translateX = parent.offsetWidth - child.offsetWidth;
								}
							}
						}
					}
					if (options.scrollY || options.freeScroll) {
						if (dir === 'y') {
							translateY = e.targetTouches[0].clientY - contenty;
							if (!options.bounce) {
								if (translateY > 0) {
									translateY = 0;
								}
								if (translateY < parent.offsetHeight - child.offsetHeight) {
									translateY = parent.offsetHeight - child.offsetHeight;
								}
							}
						}
					}
					_this.x = translateX;
					_this.y = translateY;

					_this.eventQueue.forEach(json => {
						if (json.type === 'scroll') {
							json.fn();
						}
					});
					child.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
				}
			}
			function end(e) {
				if (translateX > 0) {
					translateX = 0;
				}
				if (translateX < parent.offsetWidth - child.offsetWidth) {
					translateX = parent.offsetWidth - child.offsetWidth;
				}
				if (translateY > 0) {
					translateY = 0;
				}
				if (translateY < parent.offsetHeight - child.offsetHeight) {
					translateY = parent.offsetHeight - child.offsetHeight;
				}

				child.style.transition = `all ${options.bounceTime}ms`;
				child.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
				child.addEventListener('transitionend', tend, false);
				function tend() {
					child.style.transition = '';
					child.removeEventListener('transitionend', tend, false);
					
					_this.eventQueue.forEach(json => {
						if (json.type === 'scrollEnd') {
							json.fn();
						}
					});
				}

			}
		});
	}
	on(type,fn) {
		this.eventQueue.push({type,fn});
	}
}