window.onload = function() {
	scrollTop();

	countTime();

	banner();

}
//滚动透明
function scrollTop() {
	var header = document.querySelector('.header'),
		navscrollTop = document.querySelector('.nav').offsetTop;
	//console.log(navscrollTop);

	window.onscroll = function () {
		var scrollTop=0,
			alpha;
    	if(document.documentElement&&document.documentElement.scrollTop){  
        	scrollTop=document.documentElement.scrollTop;  
    	}else if(document.body){  
        	scrollTop=document.body.scrollTop;  
    	}

		if(scrollTop < navscrollTop || scrollTop === navscrollTop) {
			alpha = scrollTop/navscrollTop;
			// console.log(alpha);
			header.style.backgroundColor = 'rgba(201,21,35,'+alpha+')';
		}else {
			header.style.backgroundColor = 'rgba(201,21,35,1)';
		}
	}
}

//倒计时
function countTime() {
	var liArr = document.querySelectorAll('.content:nth-child(1) .top li'),
		totaltime = 3*3600;
	// console.log(liArr);
	var timer = setInterval(function() {
		if (totaltime) {
			totaltime--;
			var hours = Math.floor(totaltime/3600),
			minutes = Math.floor((totaltime%3600)/60),
			seconds = totaltime%60;
			liArr[0].innerHTML = Math.floor(hours/10);
			liArr[1].innerHTML = hours%10;
			liArr[3].innerHTML = Math.floor(minutes/10);
			liArr[4].innerHTML = minutes%10;
			liArr[6].innerHTML = Math.floor(seconds/10);
			liArr[7].innerHTML = seconds%10;
		}else {
			clearInterval(timer);
		}
	},1000)
}
//轮播图
function banner() {
		//@1.0版本
	/*var banner = document.querySelector('.banner-images'),
		width = document.body.offsetWidth;
		index = document.querySelectorAll('.banner .index li');
	// console.log(banner);
	banner.style.marginLeft = -width + 'px';
	var marginLeft = -width,
	j = 0;
	var timer = setInterval(function() {
		if(marginLeft > -width*9) {
			for (var i = 0; i < index.length; i++) {
				index[i].className ='';
			}
			index[j].className = 'current';
			j++
			marginLeft -= width;
			//console.log(marginLeft);
			banner.style.marginLeft = marginLeft + 'px';
			banner.style.transition = 'all 1s';
			//console.log(index[j]);
			if(marginLeft === -width*9) {
				marginLeft = -width;
				j = 0;
			}
		}else {
			clearInterval(timer);
		}
	},3000);*/

	//@2.0版本
	/*var banner = document.querySelector('.banner-images'),
		list = document.querySelectorAll('.banner .index li'),
		width = document.body.offsetWidth,
		index = 1;
	banner.style.transition = 'all 1s';
	var timer = setInterval(function() {
		index++;
		if(index > 9) {
			index = 1;
			banner.style.transition = '';
		}
		for (var i = 0; i < list.length; i++) {
			list[i].className = '';
		}
		banner.style.transform = 'translateX('+index*-width+'px)';
		list[index-1].className = 'current';
		//banner.style.transition = 'all 1s';
		//console.log(banner.style.tansform);
	},2000);*/

	//@3.0版本
	var banner = document.querySelector('.banner-images'),
		list = document.querySelectorAll('.banner .index li'),
		width = document.body.offsetWidth,
		index = 1;
	//开启定时器
	var timer = setInterval(function() {
		index++;
		banner.style.transition = 'all .5s';
		banner.style.transform = 'translateX('+index*-width+'px)';
		
	},2000);
	//监听过渡事件
	banner.addEventListener("webkitTransitionEnd",function() {
		if(index > 8) {
			index = 1;
			/*banner.style.transition = '';
			banner.style.transform = 'translateX('+index*-width+'px)';*/
		}else if(index < 1) {
			index = 8;
			/*banner.style.transition = '';
			banner.style.transform = 'translateX('+index*-width+'px)';*/
		}
		banner.style.transition = '';
		banner.style.transform = 'translateX('+(index*-width)+'px)';
		for (var i = 0; i < list.length; i++) {
			list[i].className = '';
		}
		list[index-1].className = 'current';
	});
	//注册三个触摸事件
	var startX,moveX;
	banner.addEventListener("touchstart",function(e) {
		//关闭定时器
		clearInterval(timer);
		//关闭过渡效果
		banner.style.transition = '';
		//纪录开始位置
		startX = e.touches[0].clientX;
	});

	banner.addEventListener("touchmove",function(e) {
		moveX = e.touches[0].clientX - startX;
		banner.style.transform = 'translateX('+(moveX+index*-width)+'px)';
	});
	
	banner.addEventListener("touchend",function (e) {
		//判断滑动距离
		var distanceX = width/3;
		if (Math.abs(moveX) > distanceX) {
			if (moveX > 0) {
				index--;
			}else {
				index++;
			}
			banner.style.transition = 'all .5s';
			banner.style.transform = 'translateX('+(index*-width)+'px)';
		}else {
			banner.style.transition = 'all .5s';
			banner.style.transform = 'translateX('+(index*-width)+'px)';
		}
		//开启定时器
		timer = setInterval(function() {
		index++;
		banner.style.transition = 'all .5s';
		banner.style.transform = 'translateX('+index*-width+'px)';
		},2000);
	});
}








/*function getScrollTop(){  
    var scrollTop=0;  
    if(document.documentElement&&document.documentElement.scrollTop){  
        scrollTop=document.documentElement.scrollTop;  
    }else if(document.body){  
        scrollTop=document.body.scrollTop;  
    }  
    console.log(scrollTop);  
}*/
