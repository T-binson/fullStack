#前台
1.html5
2.框架
3.混合式app
4.小程序

#后台
1.原生node
2.node爬虫
3.Express
4.Koa

#提升自己
1.Java、数据库	 				应用
2.算法、设计模式 				基本功、算法导论
3.基础：计算机网络原理、操作系统原理	基本功
4.别人的项目 github
5.math

websocket + video
后台：
let rs = fs.creatReadStream('1.mp4');
sock.on('video_stream_req', () => {
	rs.on('data', () => {
	sock.emit('aaa', data);
	});
});

前台：
socket.emit('video_stream_req');
let m = new MediaSource();
sock.on('aaa', (buffer) => {
	m.append(buffer);
	sock.emit('video_stream_req');
});

oVideoEle.src = URL.createObjectURL(m);

#数据结构和算法
1.存储数据:
	i.增删改查
		无序: 
			查找 O(n)
			添加 O(1)
		有序: 
			查找 O(log(n))
			添加 O(n)

	ii.存储空间--硬盘|内存、分布式云计算

2.解决问题的步骤
	排序
	KMP算法
	knn聚类算法
	汉明距离