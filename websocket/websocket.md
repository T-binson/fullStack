#原生的websocket:
1.socket.io特别好用
2.JS之类的高级语言特备不擅长处理二进制数据
3.websocket基于http的——websocket建立连接的部分，建立连接后，就变成二进制的连接

#websocket更像socket-socket(套接字):5 way shake hands
request headers include follow:
	Connection: Upgrade
	Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
	Sec-WebSocket-Key: jz4le7kr2Ae2zc8YFCm2bA==
	Sec-WebSocket-Version: 13
	Upgrade: websocket

#Node做Socket通信
	net模块
	校验key
		Sec-WebSocket-Key
		版本专有的key: 258EAFA5-E914-47DA-95CA-C5AB0DC85B11

#OSI 7层参考模型

物理层				编码、材质、造价、电压
数据链路层		内网传输 内网寻址 arp
网络层				外网传输	外网路由	 IP
传输层				传输质量	可靠连接(保证到达、保证正确、保证顺序) TCP
表现层				屏蔽不同网络类型之间的差异 x
会话层				保持双方的状态 x
应用层				具体应用相关的功能

websocket有两个协议
	ws	web socket
	wss web socket security

websocket第一次连接的数据比较特殊，还是http的头:
	GET / HTTP/1.1
	Host: localhost:3000
	Connection: Upgrade
	Pragma: no-cache
	Cache-Control: no-cache
	User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/70.0.3538.67 Safari/537.36
	Upgrade: websocket
	Origin: file://
	Sec-WebSocket-Version: 13
	Accept-Encoding: gzip, deflate, br
	Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
	Cookie: _ga=GA1.1.1608015433.1538791714
	Sec-WebSocket-Key: cU32WDxrCjbaYWKSrg14yw==
	Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

