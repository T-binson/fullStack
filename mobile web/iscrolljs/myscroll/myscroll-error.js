class Myscroll {
	constructor(selector, options={}) {
		//handle default options
		options.bounce = options.bounce || true;
		options.bounceTime = options.bounceTime || 600;
		options.scrollX = options.scrollX || false;
		options.scrollY = options.scrollY || true;
		options.freeScroll = options.freeScroll || false;
		options.startX = options.startX || 0;
		options.startY = options.startY || 0;
		options.directionLockThreshold = options.directionLockThreshold || 5;

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
					arr = [];
			if (options.scrollX) {
				arr.push(`translateX(${translateX}px)`);
			}
			if (options.scrollY) {
				arr.push(`translateY(${translateY}px)`);
			}
			child.style.transform = arr.join(' ');

			function start(e) {
				e.preventDefault();
				startx = e.targetTouches[0].clientX;
				starty = e.targetTouches[0].clientY;
				contentx = e.targetTouches[0].clientX - translateX;
				contenty = e.targetTouches[0].clientY - translateY;
				//notice the direction
				dir = '';
			}
			function move(e) {
				e.preventDefault();
				let disx = e.targetTouches[0].clientX - startx;
				let disy = e.targetTouches[0].clientY - starty;
				if (!dir) {
					if (Math.abs(disx > threshold)) {
						dir = 'x';
					} else if (Math.abs(disy > threshold)) {
						dir = 'y';
					}
				} else {
					let arr = [];
					if (options.freeScroll || dir === 'x') {
						translateX = e.targetTouches[0].clientX - contentx;
						if (options.scrollX) {
							arr.push(`translateX(${translateX}px)`);
						}
					}
					if (options.freeScroll || dir === 'y') {
						translateY = e.targetTouches[0].clientY - contenty;
						if (options.scrollY) {
							arr.push(`translateY(${translateY}px)`);
						}
					}
					child.style.transform = arr.join(' ');
				}
			}
			function end(e) {
				// child.removeEventListener('touchmove', move, false);
				// child.removeEventListener('touchend', end, false);
			}
		})
	}
}