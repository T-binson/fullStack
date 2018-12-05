class Myhammer {
	constructor(dom, options) {
		function defaultvalues() {}
		this.eventQueue = [];
		this._startTime = 0;
		this._timer = null;
		dom.addEventListener('touchstart', this._star.bind(this), false);
		dom.addEventListener('touchmove', this._move.bind(this), false);
		dom.addEventListener('touchend', this._end.bind(this), false);

	}

	on(type, fn) {
		this.eventQueue.push({name,fn});
	}
	_trigger(name) {
		this.eventQueue.forEach(item => {
			if (item.name === name) {
				item.fn();
			}
		})
	}
	_start() {
		this._startTime = Date.now();
		clearTimeout(this._timer);
		this._timer = setTimeout(function() {
			this._trigger('press');
		}.bind(this), 250);
	}
	_move() {}
	_end() {
		if (Date.now() - this._startTime <= 250) {
			clearTimeout(this._timer);
			this._trigger('tap');
		}
	}
}