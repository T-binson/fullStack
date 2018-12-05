class DrawRect {
	constructor(img, sx, sy, sw, sh) {
		if (!img || !sw || !sh) {
			throw new Error('img, sw, sh are required');
		}
		this.img = img;
		this.sx = sx;
		this.sy = sy;
		this.sw = sw;
		this.sh = sh;
	}
}