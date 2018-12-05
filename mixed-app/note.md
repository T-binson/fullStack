#混合式APP——原生语言、web
	1.为什么不用原生的
		快、方便、兼容多平台
	2.用的多吗
		非常多
		原生：性能高、开发费劲
		混合：性能一般、开发方便
	3.怎么用
		PhoneGap——国外、干净
		APICloud——国内、功能丰富
		React Native
		自用框架

	4.phonegap
		install: npm install -g phonegap@latest

--------------------------------------------------------------------------------------------------------

#apiCloud
1.文件目录
	index.html 		入口html
	config.xml 		工程配置（与phonegap类似）
		preference  配置
	css/					样式
		api.css 		api的css框架
	script/				js
		api.js 			api的js框架
	feature				第三方插件
	icon					应用图标（美工处理）
	image					图片
	launch				启动屏幕
	wgt						小组件

2.真机测试
	下载APP Loader
	WiFi同步

3.$api
	.byId()
	.dom()
	.domAll()

	.ajax()
	.get()
	.post()

	.css()
	.attr()

	.first()
	.last()
	.next()
	.prev()

	.addCls()
	.removeCls()
	.hasCls()

	.append()
	.prepend()
	.remove()

	.html()
	.val()

	.addEvt()
	.removeEvt()

4.ui library

5.数据+接口

6.系统表
	1._accessToken 	登陆后分配
	2._file
	3._role
	4._roleMapping
	5._user 				用户表