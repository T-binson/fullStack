class Button extends Sprite {
	constructor(drawRect_normal, drawRect_active, x=0, y=0, rotation=0) {
		super(drawRect_normal, x, y, rotation);
		this.drawRect_normal = drawRect_normal;
		this.drawRect_active = drawRect_active;
		//记录是否在同一位置按下
		this.downAtMe = false;
	}
	//按下按钮
	down(x, y) {
		if (this.inRect(x, y)) {
			this.setDrawRect(this.drawRect_active)
			this.downAtMe = true;
		} else {
			this.downAtMe = false;
		}
	}
	//抬起按钮
	up(x, y) {
		this.setDrawRect(this.drawRect_normal);
		if (this.inRect(x, y) && this.downAtMe) {
			//触发onclick
			this.onclick && this.onclick();
		}
	}
}