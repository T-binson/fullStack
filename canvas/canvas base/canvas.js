// 画布大小应该在js中设定(canvas.width = xx;canvas.height = xxx;),不带单位，
// 如果通过css样式设定可能会造成线条粗细不一。
//填充遵守非零环绕填充原则

//封装画矩形方法 version 1.0
function ractangle(ele,startX,startY,width,height,lineWidth,strokeStyle) {
	var ctx = ele.getContext('2d');
	//确定起点
	ctx.moveTo(startX,startY);
	ctx.lineTo(startX + width,startY);
	ctx.lineTo(startX + width,startY + height);
	ctx.lineTo(startX,startY + height);
	//闭合路径
	ctx.closePath();

	//线条宽度
	ctx.lineWidth = lineWidth;
	//线条颜色
	ctx.strokeStyle = strokeStyle;

	//绘制图形
	ctx.stroke();
	//关闭上一个路径，并开启新的路径
	ctx.beginPath();
}

//封装画矩形方法 version 2.0 面向对象
function Ractangle(ele,startX,startY,width,height,lineWidth,strokeStyle,fillStyle) {
	this.ctx = ele.getContext("2d");
	this.startX = startX;
	this.startY = startY;
	this.width = width;
	this.height = height;
	this.lineWidth = lineWidth;
	this.strokeStyle = strokeStyle;
	this.fillStyle = fillStyle
}
Ractangle.prototype.draw = function() {
	//关闭上一个路径，并开启新的路径
	this.ctx.beginPath();
	//确定起点
	this.ctx.moveTo(this.startX,this.startY);
	this.ctx.lineTo(this.startX + this.width,this.startY);
	this.ctx.lineTo(this.startX + this.width,this.startY + this.height);
	this.ctx.lineTo(this.startX,this.startY + this.height);
	//闭合路径
	this.ctx.closePath();

	//线条宽度
	this.ctx.lineWidth = this.lineWidth;
	//线条颜色
	this.ctx.strokeStyle = this.strokeStyle;
	//填充颜色
	this.ctx.fillStyle = this.fillStyle;
	//先填充再描边，防止线条宽度被覆盖
	//填充图形
	this.ctx.fill();
	//绘制图形
	this.ctx.stroke();
};