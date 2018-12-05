window.onload = function() {
	scroll_left();

	// clickList();

	scroll_right();
}

function scroll_left() {
	//获取需要操作的元素
	//获取操作元素的高度
	//计算可移动的最大范围
	//手指松开sideUl吸附回去

	var sideUl = document.querySelector('.menu'),
		parentHeight = document.querySelector('.side').offsetHeight,
		headerHeight = document.querySelector('.header').offsetHeight;
		// console.log(headerHeight);
	var sideUlHeight = sideUl.offsetHeight;
	var maxdistance = 0,mindistance = parentHeight - sideUlHeight - headerHeight;
	// console.log(maxdistance,mindistance);
	var startY = 0,
		moveY = 0,
		gap = 150,
		distanceY = 0;

	var setTransition = function() {
		sideUl.style.transition = 'all  .3s';	
	};
	var removeTransition = function() {
		sideUl.style.transition = '';
	};
	var setTransform = function(distance) {
		sideUl.style.transform = 'translateY('+distance+'px)';
	};

	//注册触摸事件
	sideUl.addEventListener('touchstart',function(event) {
		startY = event.touches[0].clientY;
	});

	sideUl.addEventListener('touchmove',function(event) {
		moveY = event.touches[0].clientY - startY;
		if ((moveY+distanceY) > (gap + maxdistance)) {
			moveY = 0;
			distanceY = gap + maxdistance;
		}else if((moveY+distanceY) < (mindistance - gap)) {
			moveY = 0;
			distanceY = mindistance - gap;
		}
		// this.style.transition = '';
		// this.style.transform = 'translateY('+(moveY+distanceY)+'px)';
		removeTransition();
		setTransform(moveY+distanceY);
	});

	sideUl.addEventListener('touchend',function(event) {
		distanceY += moveY;
		if (distanceY > maxdistance) {
			distanceY = maxdistance;
		}else if(distanceY < mindistance) {
			distanceY = mindistance;
		}
		// this.style.transition = 'all  .3s';	
		// this.style.transform = 'translateY('+distanceY+'px)';
		// console.log(distanceY);
		setTransition();
		setTransform(distanceY);
	});

	var list = document.querySelectorAll('.menu li');
	var len = list.length,
		liHeight = list[0].offsetHeight;
	for (var i = 0; i < len; i++) {
		list[i].dataset['index'] = i;
	}
	tap(sideUl,function(e) {
		for (var i = 0; i < len; i++) {
				list[i].className = '';
			}
		e.target.parentNode.className = 'active';
		var currentIndex = e.target.parentNode.dataset['index'];
		var movedistance = liHeight * -currentIndex;
		if (movedistance > maxdistance) {
			movedistance = maxdistance;
		}else if(movedistance< mindistance) {
			movedistance = mindistance;
		}
		setTransition();
		setTransform(movedistance);
		distanceY = movedistance;
	})

}

/*function clickList() {
	var list = document.querySelectorAll('.menu li');
	var menuUl = document.querySelector('.menu');
	var len = list.length;
	// console.log(len);
	for (var i = 0; i < len; i++) {
		list[i].addEventListener('click',function(argument) {
			for (var i = 0; i < len; i++) {
				list[i].className = '';
			}
			this.className = 'active';
		},false)
	}
	tap(menuUl,function(e) {
		for (var i = 0; i < len; i++) {
				list[i].className = '';
			}
		e.target.parentNode.className = 'active';
	})
	
}*/
function scroll_right() {
	//获取视窗高度，并设置页面高度为视窗高度，溢出部分通过css设置overflow:hidden
	// console.log(document.documentElement.clientHeight);
	// document.body.style.height = document.documentElement.clientHeight;

	var category = document.querySelector('.category');
	var maxmove = category.offsetHeight,
		headerHeight = document.querySelector('.header').offsetHeight;
		// console.log(headerHeight);
	//获取详细分类的可视高度
	var maxheight = document.documentElement.clientHeight - headerHeight;
	// console.log(maxheight - maxmove);

	var startY,moveY,distanceY,currentY = 0,out,more=150;

	//注册触摸事件
	category.addEventListener("touchstart",function(e) {
		startY = e.touches[0].clientY;
		// console.log(category.style.transform);
		currentY = Number(category.style.transform.slice(11,-3));
		// console.log(currentY);
	});

	category.addEventListener("touchmove",function(e) {
		moveY = e.touches[0].clientY - startY;
		
		out = moveY+currentY;
		if (out > more) {
			out = more;
		}else if(out < maxheight - maxmove - more){
			out = maxheight - maxmove - more;
		}
		this.style.transition = '';
		this.style.transform = 'translateY('+out+'px)';
		// console.log(out);
		
	});

	category.addEventListener("touchend",function(e) {
		if (out > 0) {
			distanceY = 0;
		}else if(out < (maxheight - maxmove)) {
			distanceY = maxheight - maxmove;
		}else {
			distanceY = out;
		}
		this.style.transition = 'all .3s';
		this.style.transform = 'translateY('+distanceY+'px)';
		// console.log(distanceY);
	});
}