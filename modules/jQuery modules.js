// 模块化处理
/*(function(w,factory) {
	console.log("modules");
	factory();
}(window,function() {
	return jQuery;
}));*/


// 去掉模块化处理
(function(w){
	// 工厂函数
	var jQuery = function(selector) {
		return new jQuery.fn.init(selector);
	},
		version = "1.0.0";

	// 给原型提供一个简写方式
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		jquery: version,
		selector: "",
		length: 0,
		// 入口函数
		ready: function (fn) {
			// 如果dom结构构造完毕则立即执行fn
			if (document.readyState === "complete") {
				fn();
			}
			// 如果dom没有构造完毕则为其绑定监听事件
			else  if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded",fn);
			}
			// 处理ie的兼容性问题，同样绑定监听事件
			else {
				document.attachEvent("onreadystatechange",function() {
					if (document.readyState === "complete") {
						fn();
					}
				});
			}
			},

		toArray: function() {
			return [].slice.call(this);
		},
		// 获取的是原生dom对象
		get: function(i) {
			if (i === null) {
				return this.toArray();
			}else if(i>=0) {
				return this[i];
			}else {
				return this[this.length + i];
			}
		},
		each: function(fn) {
			return jQuery.each(this,fn);
		},
		map: function() {
			return jQuery.map(this,fn);
		},
		slice: function() {
			var nodes = [].slice.apply(this,arguments);
			return jQuery(nodes);
		},
		// 获取的是jquery实例对象
		eq: function(i) {
			if (i === null) {
				return jQuery();
			}else if(i>=0) {
				return jQuery(this[i])
			}else {
				return jQuery(this[this.length + i]);
			}
		},
		first: function() {
			return this.eq(0);
		},
		last: function() {
			return this.eq(- 1);
		},
		//([]).push.apply(this);
		push: [].push,
		sort: [].sort,
		splice: [].splice
		
	}
	// 为jQuery构造函数和原型添加方法，谁调用就添加到谁身上
	// 两者之间的方法不能互相访问。即构造函数不能调用自己圆形中的方法，实例对象也不能调用构造函数的方法
	jQuery.extend = jQuery.prototype.extend = function(obj) {
		// 只有一个参数时
		/*for(var key in obj) {
			if (obj.hasOwnProperty(key)) {
				this[key] = obj[key];
			}
		}*/

		// 多个参数时
		var i = 1,
			key,
			arg = arguments,
			target = arg[0],
			len = arg.length;

		if (len === 1) {
			target = this;
			i = 0;
		}

		for(;i<len;i++) {
			for(var key in arg[i]) {
				target[key] = arg[i][key];
			}
		}
		return target;
	};

	// 静态方法
	jQuery.extend({
		// 判断是否是html片段
		isHtml: function (html) {
			if(!html) {
				return false;
			}
			else if (html.charAt(0) === "<" && html.charAt(html.length - 1) === ">" && html.length >= 3) {
				return true;
			}
			return false;
			},

		// 对字符串首尾的空格进行处理
		trimStr: function (str) {
			if (str !== "string") {
				return str;
			}
			else if (str.trim) {
				return str.trim();
			}
			else {
				return str.replace(/^\s+|\s+$/g,"");
			}
			},

		//	判断是数组还是类数组
		isArray: function (selector) {
			if (typeof selector === "function" || selector.window === selector || typeof selector !== "object") {
				return false;
			}
			else if(({}).toString.call(selector) === "[object Array]") {
				return true;
			}
			else if("length" in selector && ((selector.length === 0 || selector.length - 1 in selector))) {
				return true;
			}
			else {
				return false;
			}
		},

		// 遍历对象或类数组
		each: function (obj,fn) {
		 	var i,len,key;
		 	if (jQuery.isArray(obj)) {
		 		for(i=0,len = obj.length;i<len;i++) {
		 			if (fn.call(obj[i],i,obj[i]) === false) {
		 				break;
		 			}
		 		}
		 	}else {
		 		for(key in obj) {
		 			if (fn.call(obj[key],key,obj[key]) === false) {
		 				break;
		 			}
		 		}
		 	}
		 	return obj;
		},

		// 遍历对象或类数组返回新的数组
		map: function (obj,fn) {
		 	var i,len,key,result = [];
		 	if (jQuery.isArray(obj)) {
		 		for(i=0,len = obj.length;i<len;i++) {
		 			result.push(fn.call(obj[i],i,obj[i]));
		 		}
		 	}else {
		 		for(key in obj) {
		 			result.push(fn.call(obj[key],key,obj[key]));
		 		}
		 	}
		 	return result;
		},

		//获取dom样式
		getStyle: function(dom,style) {
		 	if (window.getComputedStyle) {
		 		return window.getComputedStyle(dom)[style];
		 	}else {
		 		return dom.currentStyle[style];
		 	}
		},

		// 绑定事件
		addEvent: function(dom,type,fn) {
			if (dom.addEventListener) {
				dom.addEventListener(type,fn);
			}else if(dom.attachEvent) {
				dom.attachEvent("on" + type,function() {
					fn.call(dom,window.event);
				});
			}else {
				dom["on" + type] = fn;
			}
		},

		// 解除事件处理程序
		removeEvent: function(dom,type,fn) {
			if (dom.removeEventListener) {
				dom.removeEventListener(type,fn);
			}else if(dom.dettachEvent) {
				dom.detachEvent("on" + type,function() {
					fn.call(dom,window.event);
				});
			}else {
				dom['on' + type] = null;
			}
		},

		// ajax
		// 默认的配置
		ajaxSettings: {
			// 默认的url为本地地址
			url: location.href,
			// 默认请求方式get
			type: "GET",
			// 默认异步请求
			async: true,
			// post发送数据时设置请求头使用
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			// 默认不看延迟事件
			timeout: null,
			// 默认请求数据类型
			dataType: "JSON",
			//请求成功执行程序
			success: function() {},
			// 请求失败执行程序
			error: function() {},

			complete: function() {}
		},
		// 对发送的数据进行处理
		urlStringy: function(data) {
			var result = "";
			if ( typeof data !== "object") {
				return "";
			}else if (typeof data === "object") {
				for( var key in data) {
					result += window.encodeURIComponent(key) + "=" + window.encodeURIComponent(data[key]) + "&";
				}
				return result.slice(0,-1);
			}
		},

		ajax: function(options) {
			var newOptions = {}, result;
			/*for(var key in jQuery.ajaxSettings) {
				newOptions[key] = jQuery.ajaxSettings[key];
			}
			for(var key in options) {
				newOptions[key] = options[key];
			}*/
			jQuery.extend(newOptions,jQuery,ajaxSettings,options);

			var xhr = new XMLHttpRequest();

			if ((newOptions.type).toUpperCase() === "GET") {
				if (newOptions.data) {
					newOptions.url += "?" + jQuery.urlStringy(newOptions.data)
				}
				xhr.open(newOptions.type,newOptions.url,newOptions.async);
				xhr.send();
			}else if ((newOptions.type).toUpperCase() === "POST") {
				xhr.setRequestHeader("Content-type",newOptions.contentType);
				if (newOptions.data) {
					xhr.send(newOptions.data);
				}else {
					xhr.send();
				}
			}
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					newOptions.complete();

					if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
						switch (newOptions.dataType){
							case "JSON":
								result = JSON.parse(xhr.responseText);
								break;
							case "script":
								eval(xhr.responseText);
								break;
							case "style":
								jQuery("<style></style>").html(xhr.responseText).appendTo('head');
								result = xhr.responseText;
							default:
								result = xhr.responseText;
								break;
						}
						newOptions.success(result);
					}else {
						newOptions.error(xhr.status);
					}
				}
			}
		},
		// ajax get
		get: function(url,data,fn) {
			var fn = fn || data || function() {};
			jQuery.ajax({
				type: "GET",
				url: url,
				data: data,
				success: fn
			});
		},

		// ajax post
		post: function(url,data,fn) {
			var fn = fn || data || function() {};
			jQuery.ajax({
				type: "POST",
				url: url,
				data: data,
				success: fn
			});
		}
	});

	//扩张原型方法
	jQuery.prototype.extend({
		// 清空所有内容,设置return this是为了链式编程
		empty: function() {
			for(var i = 0,len = this.length;i<len;i++) {
				this[i].innerHTML = "";
			}
			return this;
		},
		_empty: function() {
			this.each(function() {
				this.innerHTML = "";
			});
			return this;
		},

		// 删除所有内容
		remove: function() {
			for(var i = 0,len = this.length;i<len;i++) {
				this[i].parentNode.removeChild(this[i]);
			}
			return this;
		},
		_remove: function(sele) {
			if (arguments.length !== 0) {
				var $this = this;
				$(sele).each(function(key,val) {
					var type = val.tagName;
					$this.each(function(k,v) {
						var t = v.tagName;
						if (t === type) {
							this.parentNode.removeChild(this);
						}
					});
				});
			} else {
				this.each(function() {
					this.parentNode.removeChild(this);
				});
			}
			return this;
		},

		// 获取或设置内容，可解释html标签
		html: function(html) {
			if (arguments.length === 0) {
				return this[0].innerHTML;
			}else if(arguments.length === 1) {
				for(var i = 0,len = this.length;i<len;i++) {
					this[i].innerHTML = html;
				}
			}
			return this;
		},
		_html: function(html) {
			if (arguments.length === 0) {
				return this.get(0).innerHTML;
			}else {
				this.each(function() {
					this.innerHTML = html;
				})
			}
			return this;
		},

		// 获取或设置文本内容，不解释html标签
		text: function(text) {
			var result = "";
			if (arguments.length === 0) {
				for(var i  = 0,len = this.length;i<len;i++) {
					result += this.innerText;
				}
				return result;
			}else if(arguments.length >=1) {
				for(var i = 0,len = this.length;i<len;i++) {
					this[i].innerText = text;
				}
			}
			return this;
		},
		_text: function(text) {
			var result = "";
			if(arguments.length === 0) {
				this.each(function() {
					result += this.innerText;
				});
				return result;
			}else {
				this.each(function() {
					this.innerText = text;
				});
			}
			return this;
		},

		// 把内容添加(剪切或克隆)到指定元素后面
		appendTo: function(selector) {
			var result = [],tempNode = null,selector = jQuery(selector);

			for(var i = 0,len = this.length;i<len;i++) {
				for(var j = 0,lens = selector.length;j<lens;j++) {
					if (j === 0) {
						tempNode = this[i];
						selector[j].appendChild(tempNode);
						result.push(tempNode);
					}else {
						tempNode = this[i].cloneNode(true);
						selector[j].appendChild(tempNode);
						result.push(tempNode);
					}
				}
			}
			return jQuery(result);
		},
		_appendTo: function(selector) {
			var result = [],tempNode = null,selector = jQuery(selector);

			this.each(function() {
				var that = this;
				selector.each(function(i) {
					tempNode = i === 0?that:that.cloneNode(true);
					this.appendChild(tempNode);
					result.push(tempNode);
				});
			});
			return jQuery(result);
		},
		AppendTo: function(selector) {
			var result = [],tempNode = null,selector = jQuery(selector);

			for(var i = 0,len = selector.length;i<len;i++) {
					if (i === 0) {
						for(var j = 0,lens = this.length;j<lens;j++) {
							tempNode = this[j];
							selector[i].appendChild(tempNode);
							result.push(tempNode);
						}
					}else {
						for(var j = 0,lens = this.length;j<lens;j++) {
							tempNode = this[j].cloneNode(true);
							selector[i].appendChild(tempNode);
							result.push(tempNode);
						}
					}
				}
			return jQuery(result);
		},
		_AppendTo: function(selector) {
			var result = [],tempNode = null,selector = jQuery(selector);
			var that = this;
			selector.each(function(i) {
					if (i === 0) {
						that.each(function(){
							tempNode = this;
							selector[i].appendChild(tempNode);
							result.push(tempNode);
						});
					}else {
						that.each(function() {
							tempNode = this.cloneNode(true);
							selector[i].appendChild(tempNode);
							result.push(tempNode);
						});
					}
				});
			return jQuery(result);
		},

		// 在指定元素后面添加内容
		append: function(selector) {
			// 对传入的参数进行统一包装成jquery对象
			var $selector = jQuery(selector);
			if (typeof selector === "string") {
				for(var i = 0,len = this.length;i<len;i++) {
					this[i].innerHTML += selector;
				}
			}else {
				//将selector的length提取出循环，
				// 避免在页面中添加selector的克隆体后，length发生改变，
				// 导致后面添加数量的增多
				// var lens = $selector.length;
				for(var i = 0,len = this.length;i<len;i++) {
					for(var j = 0,lens = $selector.length;j<lens;j++) {
						if (i === 0) {
							this[i].appendChild($selector[j])
						}else {
							this[i].appendChild($selector[j].cloneNode(true));
						}
					}
				}
			}
			return this;
		},
		_append: function(selector) {
			// 对传入的参数进行统一包装成jquery对象
			var $selector = jQuery(selector);
			if (typeof selector === "string") {
				this.each(function() {
					this.innerHTML += selector;
				});
			}else {
				$selector.appendTo(this);
			}
			return this;
		},

		// 把内容添加(剪切或克隆)到指定元素前面
		prependTo: function(selector) {
			var result = [],tempNode = null,selector = jQuery(selector);

			for(var i = 0,len = this.length;i<len;i++) {
				for(var j = 0,lens = selector.length;j<lens;j++) {
					if (j === 0) {
						tempNode = this[i];
						selector[j].insertBefore(tempNode,selector[j].firstChild);
						result.push(tempNode);
					}else if(j >= 1) {
						tempNode = this[i].cloneNode(true);
						selector[j].insertBefore(tempNode,selector[j].firstChild);
						result.push(tempNode);
					}
				}
			}
			return jQuery(result);
		},
		_prependTo: function(selector) {
			var result = [],tempNode = null,selector = jQuery(selector);

			this.each(function() {
				var that = this;
				selector.each(function(j) {
					tempNode = j === 0?that:that.cloneNode(true);
					this.insertBefore(tempNode,this.firstChild);
					result.push(tempNode);
				});
			});
			return jQuery(result);
		},
		
		// 在指定元素前添加内容
		prepend: function(selector) {
			var $selector = jQuery(selector);
			if (typeof selector === "string") {
				for(var i = 0,len = this.length;i<len;i++) {
					this[i].innerHTML = selector + this[i].innerHTML;
				}
			}else {
				for(var i = 0,len = this.length;i<len;i++) {
					for(var j = 0,lens = $selector.length;j<lens;j++) {
						if (i === 0) {
							this[i].insertBefore($selector[j],this[i].firstChild);
						}else {
							this[i].insertBefore($selector[j].cloneNode(true),this[i].firstChild);
						}
					}
				}
			}
			return this;
		},
		_prepend: function(selector) {
			var $selector = jQuery(selector);
			if (typeof selector === "string") {
				this.each(function() {
					this.innerHTML = selector + this.innerHTML;
				})
			}else {
				$selector.prependTo(this);
			}
			return this;
		},
		_insertBefore:function(selector) {
			var result = [],tempNode = null,selector = jQuery(selector);

			this.each(function() {
				var that = this;
				selector.each(function(j,v) {
					tempNode = j === 0?that:that.cloneNode(true);
					v.parentNode.insertBefore(tempNode,v);
					result.push(tempNode);
				});
			});
			return jQuery(result);
		},

		// 判断元素中是否含有指定的class
		hasClass: function(claName) {
			for(var i = 0,len = length;i<len;i++) {
				if ((" " + this[i].className + "").indexOf(" " + claName + " ") === -1) {
					return false;
				}
				return true;
			}
		},
		_hasClass: function(claName) {
			var has = false;
			this.each(function() {
				if ((" " + this.className + " ").indexOf(" " + claName + " ") !== -1) {
					has = true;
					// 中断each遍历
					return false;
				}
			});
			return has;
		},

		// 为元素添加classname
		addClass: function(claName) {
			if (arguments.length === 0) {return this;};
			claName = jQuery.trim(claName).split(" ");
			this.each(function() {
				for(var i = 0,len = claName.length;i<len;i++) {
					if(!jQuery(this).hasClass(claName[i])) {
						this.className += " " + claName[i];
					}
				}
			});
			return this;
		},

		// 删除元素的classname
		removeClass: function(claName) {
			if (arguments.length === 0) {
				this.each(function() {
					this.className = "";
				});
			}else {
				this.each(function() {
					this.className = (" " + this.className + " ").replace(" " + claName + " "," ");
				})
			}
			return this;
		},
		_removeClass: function(claName) {
			if (arguments.length === 0) {
				this.each(function() {
					this.className = "";
				});
			}else {
				claName = jQuery.trim(claName).split(" ");
				this.each(function() {
					var that = this;
					jQuery.each(claName,function(i,val) {
						that.className = (" " + that.className + " ").replace(" " + val + " "," ");
						// that.className = that.className.replace(new RegExp("\\b"+val+"\\b"),"");
					});
				});
			}
			return this;
		},

		// 有则删除，无则添加
		toggleClass: function(claName) {
			this.each(function() {
				var $this = jQuery(this);
				if ($this.hasClass(claName)) {
					$this.removeClass(claName);
				}else {
					$this.addClass(claName);
				}
			});
			return this;
		},
		_toggleClass: function(claName) {
			//if doesn't pass the parameter
			if (arguments.length === 0) {
				this.removeClass();
				return this;
			}
			claName = jQuery.trim(claName).split(" ");
			this.each(function() {
				var $this = jQuery(this);
				jQuery.each(claName,function(i,val) {
					if ($this.hasClass(val)) {
						$this.removeClass(val);
						// $this[0].className = "";
					}else {
						$this.addClass(val);
						// $this[0].className += " " + val;
					}
				}); 
			});
			return this;
		},

		// 设置或获取元素的属性节点值
		attr: function(attr,val) {
			if (typeof attr !== "string" && typeof attr !== "object") {
				return this;
			}else if (typeof attr === "string") {
				if (arguments.length === 1) {
					return this[0].getAttribute(attr);
				}else if(arguments.length >=2) {
					for(var i = 0,len = this.length;i<len;i++) {
						this[i].setAttribute(attr,val);
					}
				}
			}else if (typeof attr === "object") {
				for(var key in attr) {
					if (attr.hasOwnProperty(key)) {
						for(var i = 0,len = this.length;i<len;i++) {
							this[i].setAttribute(key,attr[key]);
						}
					}
				}
			}
			return this;
		},
		_attr: function(attr,val) {
			if (typeof attr !== "string" && typeof attr !== "object") {
				return this;
			}else if (arguments.length === 1) {
				if (typeof attr === "string") {
					return this.get(0).getAttribute(attr);
				}else if(typeof attr === "object") {
					var that = this;
					jQuery.each(attr,function(key,val) {
						that.each(function() {
							this.setAttribute(key,val);
						});
					});
				}
			}else if (arguments.length >=2) {
						this.each(function() {
							this.setAttribute(attr,val);
						});
					}
			return this;
		},

		// 设置或获取元素的属性
		prop: function(attr,val) {
			if (typeof attr !== "string" && typeof attr !== "object") {
				return this;
			}else if (typeof attr === "string") {
				if (arguments.length === 1) {
					return this[0][attr];
				}else if(arguments.length >=2) {
					for(var i = 0,len = this.length;i<len;i++) {
						this[i][attr] = val;
					}
				}
			}else if (typeof attr === "object") {
				for(var key in attr) {
					for(var i = 0,len = this.length;i<len;i++) {
						this[i][key] = attr[key];
					}
				}
			}
			return this;
		},
		_prop: function(attr,val) {
			if (typeof attr !== "string" && typeof attr !== "object") {
				return this;
			}else if (arguments.length === 1) {
				if (typeof attr === "string") {
					return this[0][attr];
				}else if(typeof attr === "object") {
					var that = this;
					jQuery.each(attr,function(key,val) {
						that.each(function() {
							this[key] = val;
						});
					});
				}
			}else if (arguments.length >=2) {
				this.each(function() {
					this[attr] = val;
				});
			}
			return this;
		},

		// 设置或获取元素的value值
		val: function(value) {
			if (arguments.length === 0) {
				return this[0].value;
			}else {
				for(var i = 0,len = this.length;i<len;i++) {
					this[i].value = value;
				}
			}
			return this;
		},
		_val: function(value) {
			if (arguments.length === 0) {
				return this[0].value;
			}else {
				this.each(function() {
					this.value = value;
				});
			}
			return this;
		},

		//设置或获取元素的样式
		css: function(styleName,val) {
			if (arguments.length === 1) {
				if (typeof styleName === "string") {
					return jQuery.getStyle(this[0],styleName);
				}else if(typeof styleName === "object") {
					for(var key in styleName) {
						for(var i = 0,len = this.length;i<len;i++) {
							this[i]["style"][key] = styleName[key];
						}
					}
				}
			}else if (arguments.length >= 2) {
				for(var j = 0,len = this.lenght;j<len;j++) {
					this[i]["style"][styleName] = val;
				}
			}
			return this;
		},
		_css: function() {

		},

		// on单个事件绑定
		on: function(type,fn) {
			this.each(function() {
				jQuery.addEvent(this,type,fn);
			});
			return this;
		},
		// 批量绑定事件
		_on: function(type,fn) {
			// 遍历每一个元素
			this.each(function() {
				var that = this;
				// 判断每一个元素是否存在$_event_cache属性，不存在说明是第一次绑定
				this.$_event_cache = this.$_event_cache || {};
				//如果存在，则判断每一个元素是否绑定type类事件，不存在则新增
				if (!this.$_event_cache[type]) {
					this.$_event_cache[type] = [];
					this.$_event_cache[type].push(fn);

					jQuery.addEvent(this,type,function(e) {
						for(var i = 0,len = that.$_event_cache[type].length;i<len;i++) {
							that.$_event_cache[type][i].call(that,e);
						}
					});

					/*for(var i = 0,len = this.$_event_cache[type].length;i<len;i++) {
						jQuery.addEvent(this,type,this.$_event_cache[type][i]);
					};*/
				}else {
					// 该事件类型已存在，直接把回调函数存到该type类事件中
					this.$_event_cache[type].push(fn);
				}
			});
			return this;
		},

		// off单个事件解除
		off: function(type,fn) {
			this.each(function() {
				jQuery.removeEvent(this,type,fn);
			});
			return this;
		},
		// 批量多个事件解除
		_off: function(type,fn) {
			// 获取实参长度，留待后续使用
			var arglen = arguments.length;
			// 遍历每一个元素
			this.each(function() {
				// 判断每一个元素是否存在$_event_cache属性，即是否让存在绑定事件
				if (!this.$_event_cache) {
					return;
				}else {
					// 元素有绑定事件但没有传入实参，则解除全部绑定的事件
					if (arglen === 0) {
						for(var key in this.$_event_cache) {
							this.$_event_cache[key] = [];
						}
						// this.$_event_cache = {};
						// 传入实参length为1，则解除传入的type类事件
					}else if (arglen === 1) {
						this.$_event_cache[type] = [];
					}else {
						// 传入实参长度大于1，则比较绑定事件和回调函数是否一致
						for(var i = this.$_event_cache[type].length - 1;i >= 0;i--) {
							// 任意两个外观形式相同的函数比较都不相等,匿名函数无法解除
							if (this.$_event_cache[type][i] === fn) {
								this.$_event_cache[type].splice(i,1);
								// 以下语句无法解除
								// jQuery.removeEvent(this,type,fn);
							}
						}
					}

				}	
			});
			return this;
		},

		//深浅克隆事件
		clone: function(bol) {
			var res = [];
			//深复制
			if (bol) {
				this.each(function(key,ele) {
					var temp = ele.cloneNode(true);
					$.each(ele.$_event_cache,function(type, arr) {
						$.each(arr,function(index,method) {
							$(temp).on(name,method);
						});
					});
					res.push(temp);
				});
				return $(res);
			}else {
				//浅复制
				this.each(function() {
					var temp = ele.cloneNode(true);
					res.push(temp);
				});
				return $(res);
			}

		}
	});

	// init是jQuery中真正的构造函数 ===>入口函数
	var init = jQuery.fn.init = function(selector) {

		// 如果传入的是undefined,null,'',0,NaN,则返回空对象(空实例)
		if (!selector) {
			return this;
		}	

		// 如果传入的是字符串string,则判断是html片段还是选择器
		else if (typeof selector === "string") {
			//去掉传入的字符串首尾的空格
			selector = jQuery.trimStr(selector);
			if (jQuery.isHtml(selector)) {
				var tempDiv = document.createElement("div");
				tempDiv.innerHTML = selector;
				([]).push.apply(this,tempDiv.childNodes);
				return this;
			}else {
				try{
					var nodes = document.querySelectorAll(selector);
					([].push.apply(this,nodes));
					return this;
				}catch(e) {
					this.length = 0;
					return this;
				}
			}
		}

		// 如果传入的是数组或类数组，则判断是数组还是类数组
		else if (jQuery.isArray(selector)) {
			([]).push.apply(this,([]).slice.call(selector));
		}

		else {
			this[0] = selector;
			this.length = 1;
		}
		// return this;
	};
	// 替换构造函数的原型为工厂函数的原型
	// 同时也向外界暴露接口，通过jQuery.fn以扩充插件方法
	init.prototype = jQuery.fn;

	w.jQuery = w.$ = jQuery; 
}(window));

// 插件实现实例
/*jQuery.fn.alert = function () {
	console.log("plusin");
};
var $$ = $();
$$.alert();*/


