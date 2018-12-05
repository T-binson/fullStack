class Cannon extends Sprite {
	constructor(type, x=0, y=0, rotation=0) {
		if (type > 7 || type < 1) {
			throw new Error('unknown cannon type');
		}
		const SIZE = [null,
			{w: 74, h: 74},
			{w: 74, h: 76},
			{w: 74, h: 76},
			{w: 74, h: 83},
			{w: 74, h: 85},
			{w: 74, h: 90},
			{w: 74, h: 94}
		];
		super(new DrawRect(_imgs[`cannon${type}`], 0, 0, SIZE[type].w, SIZE[type].h), x, y, rotation);
		this.size = SIZE;
		this.setType(type);
		this.maxFrame = 5;
	}

	setType(type) {
		this.type = type;
		this.setDrawRect(new DrawRect(_imgs[`cannon${type}`], 0, 0, this.size[type].w, this.size[type].h));
	}
}