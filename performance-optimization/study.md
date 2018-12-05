#XSS（Cross Site Scripting）
	跨站脚本攻击
	原理：
		程序 + 数据(数据中含有脚本代码) = 结果
	危害：
		获取页面数据
		获取Cookies
		劫持前端逻辑
		发送请求
	分类：
		反射型：url参数直接注入
		存储型：存储到DB(数据库)后读取注入
	攻击注入点：
		HTML节点内容： 内容中含有script标签
		HTML属性：关闭属性，插入脚本
		Javascript代码： 关闭属性值，插入脚本
		富文本（含有html标签）
	防御：
		浏览器自带：X-XSS-Protection，默认值1，防御有限（HTML节点内容、HTML属性的反射型）
		HTML节点内容：正则转义内容中的<&lt; 和 >&gt;
		HTML属性: 正则转义属性中的&quto;和&#39;
		JavaScript代码： 使用JSON.stringify()方法进行转义为字符串
		富文本： 
			黑名单过滤：去掉script标签和JavaScript，变种太多，成本较高
			白名单保留部分标签和属性：cheerio库 xss组件
		CSP：Content Security Policy(内容安全策略)-参考MDN的相关内容
			用于指定那些内容可执行
				child-src content-src default-src
				font-src frame-src img-src
				manifest-src media-src object-src
				script-src style-src worker-src
			<host-source> <scheme-source> 'self'
			'unsafe-inline' 'unsafe-eval' 'none'
			'none-<base64-value>' <hash-source>
			'strict-dynamic'
			(`Content-Security-Policy`)
		PHP-XSS
			内置函数转义
			DOM解释白名单
			第三方库
			CSP

#CSRF（Cross Site Request Forgy）
	跨站请求伪造
	原理：
		目标网站前端——>目标网站后端<——其他网站的前端
	危害；
		利用用户登录态：盗取用户资金
		用户不知情
		完成业务要求
	防御：
		禁止第三方网站带Cookies
			SameSite: strict/lax
		在前端页面加入验证信息
			验证码(ccap包)
			token:随机字符串
		验证请求头中的referer
	PHP防御
		Cookies SameSite
		http referer
		token

#Cookies
	特性：
		前端数据存储
		后端通过http头设置
		请求是通过http头传给后端
		前端可读写
		遵守同源策略
		属性：
			域名domain
			有效期expires（设置有效期以删除cookie）
			路径path
			http-only
			secure
	作用：
		存储个性化设置
		存储未登录时用户唯一标识
		存储已登陆用户的凭证：用户ID + 签名 / SessionId
		存储其他业务数据
	Cookies和XSS的关系
		XSS可能偷取Cookies
		http-only的Cookie不会被偷
	Cookies和CSRF的关系
		CSRF利用了用户Cookies
		攻击站点无法读写Cookies
		最好能阻止第三方带Cookies
	安全策略
		签名防篡改
		私有变换（加密）
		http-only（防止XSS）
		secure
		same-site

#点击劫持
	用户不知情的情况下亲手操作
	防御：
		JavaScript禁止内嵌
			判断top对象
		X-FRAME-OPTIONS禁止内嵌（DENY）（推荐）

#传输层问题
	HTTP传输窃听
		浏览器<->代理服务器<->链路<->服务器
		命令行：tracert 目标网址————>查看跳转节点
		anyproxy工具
	http窃听敏感信息
	http篡改
	HTTPS：TLS（SSL）加密
	中间人攻击
		CA认证

#password
	##密码的作用
		存储的密码与输入密码的对比
	##密码的存储
		严禁明文存储（防泄漏）
		单向变换（防泄漏）
		变换复杂度要求（防猜解）
			变换次数越多越安全
				加密成本几乎不变（生成密码时速度慢一些）
				彩虹表失效（数量太大，无法建立通用性）
				解密成本增大N倍
		密码复杂度要求（防猜解）
		加盐（防猜解）
		哈希算法（信息摘要）
			明文-密文————一一对应
			雪崩效应
			密文-明文 无法反推
			密文固定长度
			常见哈希算法：md5 sha1 sha256
			单向变换彩虹表
				md5(明文) = 密文
				md5(md5(明文)) = 密文
				md5(sha1(明文)) = 密文
				md5(sha256(sha1(明文))) = 密文

	##密码的传输
		https传输
		频率限制
		前端加密意义有限
	##密码的替代方案
		
	##生物特征密码的问题
		指纹（唇纹）
		声纹识别
		虹膜识别
		人脸识别

		私密性-容易泄露
		安全性-碰撞
		唯一性-终身唯一 无法修改
	##密码泄露
		数据库被偷
		服务器被入侵
		通讯被窃听
		内部人员泄露
		其他网站（撞库）

#接入层注入问题
	##关系型数据库
		存放结构化数据
		可高效操作大量数据
		方便处理数据之间的关联关系
	##SQL语言
		select * from table where id = 1
		标准化
		类似自然语言的描述性语言
		用于关系型数据库
		可完成增删改查以及各种复杂的数据库操作
	##SQL注入
		select * from table where id = ${id}
		数据————>程序
		危害
			猜解密码
			获取数据
			删库删表
			拖库
		防御
			关闭错误输出
			检查数据类型
			对数据进行转义
			使用参数化查询（最根本）
			使用ORM（对象关系映射）（最好）
	##NoSQL注入和防御
			检查数据类型
			类型转换
			写完整条件

#接入层上传问题
	上传文件
	再次访问上传的文件
	上传的文件被当成程序解释
	防御
		限制上传后缀（最简单）
		文件类型检查
		文件内容检查
		程序输出
		权限控制-可写可执行互斥

#信息泄露
	泄露系统敏感信息
	泄露用户敏感信息
	泄露用户密码
	途径
		错误信息失控
		SQL注入
		水平权限控制不当（与垂直相对）
		XSS/CSRF

#社会工程学
	人肉搜索
	OAuth思想
		一切行为由用户授权
		授权行为不泄露敏感信息
		授权会过期
		过程：
			用户授权读取资料
			无授权的资料不可读取
			不允许批量获取数据
			数据接口可风控审计

#拒绝服务DOS
	模拟正常用户
	大量占用服务器资源
	无法服务正常用户
	类型：
		TCP半连接
		http连接
		DNS
		DDOS（大规模分布式拒绝服务攻击）：
			流量可达几十到上百G
			分布式（肉鸡、代理）
			极难防御
	防御：
		应急防火墙
		交换机、路由器
		流量清洗
		高防IP
		避免重逻辑业务
		快速失败快速返回
		防雪崩机制
		有损服务
		CDN（减少服务器的负载）

#重放攻击
	请求被窃听或记录
	再次发起相同的请求
	产生意外的结果
		用户被多次消费
		用户登录态被盗取
		多次抽奖
	防御
		请求加密（HTTPS）
		请求加时间戳
		请求加token（session）
		nonce
		加签名以防篡改时间戳/nonce

#资源合并与压缩
	##http请求的过程及潜在的性能优化点
		减少http请求数量和减少请求资源大小
		压缩与合并原理
		压缩与合并的方法
			html压缩： 压缩在文本中有意义，在html中不显示的字符
				在线网站(少用)
				nodejs: html-minifier工具包
				后端模板引擎渲染压缩
			css压缩：无效代码删除，css语义合并
				在线网站(少用)
				nodejs: html-minifier工具包对html中的css压缩
				使用clean-css进行压缩
			js压缩：
			无效字符的删除
			剔除注释
			代码语义的缩减和优化
			代码保护

			在线网站(少用)
			nodejs: html-minifier工具包对html中的js压缩
			使用uglifyjs2进行压缩

		合并
			存在的问题：
				首屏渲染问题
				缓存失效问题

			公共库合并
			不同页面的合并
			见机行事，随机应变

			在线网站合并
			nodejs合并
