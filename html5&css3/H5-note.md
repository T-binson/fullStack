#HTML 5
##html5狭义概念
  html4的升级版本，结构html5，样式css，行为js api有所增强
##html5广义概念：浏览器技术发展的一个阶段，包含html5语义化标签+css3+js   API一套前端技术的组合.
##标签语义化：在合适的地方用合适的标签。
  好处：更简洁，更宽松，有利于seo优化
##注意：ie8以下不支持h5标签
  解决方法：通过条件注释引入html5shiv.js脚本文件，因为只有ie能识别条件注释
  eg：<!-- [if lte ie8]>
  	  	<script src="html5shiv.min.js"></script>
  	  <![endif]-->
  lte解释:l->less,t->than,e->equal,g->great
##智能表单（收集用户信息，多数能自动验证）
###表单类型type
   email url search number(step属性设置步长) tel(不会自动验证数字号码) time date month week datetime range color
###表单元素
   数据列表标签datalist
   <input type="text" list="al">
   <datalist id="al">
	<option>a</option>
	<option>b</option>
	<option>c</option> 	
   </datalist>
   list属性和id属性要一致

   <form action="#">
     <fieldset>
      <legend>form tag</legend>
      <label for="username">
        username: <input type="text" name="user" id="username"/>
      </label><br />
      <label for="pass">
        password: <input type="password" name="paw" id="pass"/>
      </label>
      <br />
      hobby: <input type="text" list="hobby">
     <datalist id="hobby">
      <option>football</option>
      <option>basketball</option>
      <option>cracketball</option> 	
     </datalist>
      <br />
      <label for="">
        recommention: <output>developer</output>
      </label>
      <br />
      <label for="">
        加密类型：<keygen />
      </label>
      <br />
      <label for="#">
        度量器：<meter value="90" max="100" min="0" low="20" high="80"></meter>
      </label>
      <br />
      进度条：<progress value="70" min="0" max="100"></progress>
  	</fieldset>
   </form>
###表单属性
   placeholder 提示文字占位符
   autofocus 自动获取焦点
   autocomplete 自动完成填充，默认开启on，关闭设置off
   require：指定必填
   multiple：多选，上传多个文件时可以使用
   novalidate：关闭默认验证功能，只能加在form标签上
   pattern：自定义正则验证
   	pattern="正则表达式"
###表单事件
   oninput	当用户输入的时候
   oninvalid	当验证不通过时触发，一般用于设置验证不通过时的提示
   eg：dom.oninvalid = () => {this.setCustomValidity('提示信息')}

##多媒体
  以前在网页上播放多媒体必须依赖第三方插件
  	mediaplay 快播 flash插件
  现在H5提供视频和音频的标签

  <!--多媒体标签-->
  <figure>
    <figcaption>多媒体标题</figcaption>
    <video>
      <source src="" />
      <source src="" />
      <source src="" />
    </video>
  </figure>
###audio
   一般写法
   <audio src="" autoplay controls loop />
   兼容性写法
   <audio controls>
   	<source src="" />
   	<source src="" />
   	抱歉，您的浏览器不支持音频标签
   </audio>
###video：行内块级元素
   一般写法
   <video src="" autoplay controls loop />
   兼容性写法
   <video controls>
   	<source src="" />
   	<source src="" />
   	抱歉，你的浏览器不支持视频标签
   </video>
##dom扩展
  当在浏览器中打开一个页面后，浏览器会首先来解释页面，把解释出来的数据放到一个dom对象中
###获取元素
  1.document.querySelector();
  获取符合条件的第一个标签
  2.document.querySelectorAll();
  获取所有符合条件的标签
  注意：只能获取静态的标签，无法获取动态添加的
###类名操作
   增：dom.classList.add('类名')
   删：dom.classList.remove('类名')
   切换(改)：dom.classList.toggle('类名')
   查：dom.classList.contains('类名')，返回true/false
###自定义属性
   获取标签原有属性
   dom.标签原有属性; 如className,title

   给标签添加自定义属性，必须以data-开头
   dom.自定义属性="";
   获取标签自定义属性，通过dataset['']获取
   dom.dataset['自定义属性'];
   eg: <div data-name='attr'></div>
   	   <div data-my-name='mn'></div>
   dom.dataset['name'];//attr
   dom.dataset['myName'];//mn，小驼峰式
   设置自定义属性
   dom.dataset['自定义属性'] = '';
##拖拽
  默认图片和链接可以拖拽
  设置元素的属性draggable=true可以实现元素
###拖拽事件
   拖拽元素
   ondrag 		应用于拖拽元素，整个拖拽过程都会调用
   ondragstart	应用于拖拽元素，当拖拽开始时调用
   ondragleave	应用于拖拽元素，当鼠标离开拖拽元素时调用
   ondragend	应用于拖拽元素，当拖拽结束时调用

   目标元素
   ondragenter	应用于目标元素，当拖拽元素进入时调用
   ondragover	应用于目标元素，当停留在目标元素上时调用
   ondrop		应用于目标元素，当在目标元素上松开鼠标时调用
   ondragleave	应用于目标元素，当鼠标离开目标元素时调用
##全屏(有兼容性问题)
  兼容性写法
  <!-- 请求全屏 -->
  if(dom.requestFullscreen) {
   dom.requestFullscreen();
  }else if(dom.mozRequestFullScreen) {
  	dom.mozRequestFullScreen();
  }else {
   dom.webkitRequestFullScreen();
  }
  <!-- 检测当前是否处于全屏状态 -->
  if(document.fullScreen) {

  }else if(document.webkitIsFullScreen) {

  }else if(document.mozFullScreen) {

  }
  <!-- 取消全屏 -->
  if(document.cancelFullscreen) {
   document.cancelFullscreen();
  }else if(document.mozCancelFullScreen) {
  	document.mozCancelFullScreen();
  }else {
   document.webkitCancelFullScreen(); //document.webkitExitFullScreen();
  }
  注意：取消全屏必须用在document这个元素上
##web存储
  传统方式：document.cookie 大小有限(4K左右)，个数大概20~50之间，而且一次只能一个(键值对),解释复杂，只能在同一个浏览器的同一个路径下访问
  document.cookie = "key=value;expires=time";(键值对的形式，expires设置过期时间,时间过期数据则会清除掉)
  eg: document.cookie = "name=t-bin;path=/;domain=xxx.com"
  H5方式：Storage
  	1.设置、读取方便
  	2.容量较大，window.sessionStorage：5M、window.localStorage：20M
  	3.只能存储字符串，可通过JSON.stringify()编码后存储
  	区别：
    window.sessionStorage
    生命周期为关闭浏览器窗口，在同一窗口下数据可以共享
    window.localStorage
    永久生效，除非手动删除
    可以多窗口共享
###方法
   setItem(key,value) 设置存储内容
   getItem(key) 读取存储内容
   removeItem(key) 删除存储内容
   clear() 清空所有存储内容
   eg: window.sessionStorage.setItem('usernae',input.value);
   	   windoe.localStorage.setItem('pwd',input.value);
##网络状态监听
  监听上线
  window.addEventListener('online',function() {

  });
  监听离线
  window.addEventListener('offline',function() {

  });
##应用缓存
  HTML5中我们可以轻松的构建一个离线（无网络状态）应用，只需要创建一个cache manifest文件。
  优点：
  1.按需配置缓存的资源
  2.无网络状态仍可用
  3.本地读取缓存资源，加快访问速度，增强用户体验
  4.减少请求，缓解服务器压力
###步骤
   1.创建一个扩展名为.appcache的文件
   2.将该文件路径配置到需要缓存资源的页面的根标签html上: <html manifest="xx.appcache">
   3.手动添加内容到xx.appcache文件上或者利用程序自动生成
	格式如下：
	CACHE MANIFEST

	#注释以#开头
	#要缓存的文件
	CACHE:
		ad.jpg

	#指定必须联网才能缓存的文件，可使用通配符*
	NETWORK:
		https://cms-bucket.nosdn.127.net/3afebb5477a049e3bb019b2fe9e27f3e20180224075728.jpeg

	#当页面无法访问时返回的页面
	FALLBACK:
		404.html
##地理定位
  LBS(location base service)
  位置信息获取方式:
  ip地址
  三维坐标: gps wifi 手机信号
  用户自定义
  H5地理定位api
  if(navigator.geolocation) {
	 navigator.geolocation.getCurrentPosition(successcallback(position),errorcallback(error),[options]);
  }else {
	 alert('sorry,your browser disabled this');
  }
  function successcallback(position) {
	 let [latitude,longitude] = [position.coords.latitude,position.coords.longitude];
  }