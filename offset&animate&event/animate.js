//获取屏幕滚动距离
function getScroll() {
	if (window.pageYOffset) {
		return {
			"top": window.pageYOffset,
			"left": window.pageXOffset
		}
	}else if(document.compatMode === "CSS1Compat") {
		return {
			"top": document.documentElement.scrollTop,
			"left": document.documentElement.scrollLeft
		}
	}else {
		return {
			"top": document.body.scrollTop,
			"left": document.body.scrollLeft
		}
	}
}

//获取屏幕可视区域的宽高
function client() {
	if(window.innerHeight !== undefined){
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){
        return {
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        }
    }else{
        return {
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        }
    }
}

//获取元素样式
function getStyle(ele,attr) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(ele,null)[attr];
	}else {
		return ele.currentStyle[attr];
	}
}

// 缓动动画框架
function animate(ele,json,fn,time) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var bool = true;
		for(var key in json) {
			
			if (key === "opacity") {
				var eleStyle = getStyle(ele,key) || 1;
				eleStyle = eleStyle * 100;
			}else {
				var eleStyle = parseInt(getStyle(ele,key)) || 0;
				// console.log(eleStyle);
			}

			var step = (json[key] - eleStyle)/10;
			step = step > 0?Math.ceil(step):Math.floor(step);

			if (key === "opacity") {
				ele.style[key] = (eleStyle + step)/100;
				// console.log(ele.style[key]);
			}else if (key === "z-index") {
				ele.style[key] = json[key];	
				// bool = true;
			}else {
				ele.style[key] = eleStyle + step + "px";
			}

			if (json[key] !== eleStyle) {
				bool = false;
			}
			// console.log(ele.style["width"]);
		}

		// console.log(1);
		if (bool) {
			clearInterval(ele.timer);
			if (fn !== "undefined") {
				fn();
			}
		}
	},time)	
}