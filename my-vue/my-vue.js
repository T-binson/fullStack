Proxy.prototype = Proxy.prototype || Object.prototype;
// 因为MyVue继承自Proxy，所以在new实例时Proxy也被new了，因此对data的代理检测也会被促发
class MyVue extends Proxy {
	constructor(json) {
		let _container = {};
		let data = json.data || {};

		super(data, {
			get(target, key) {
				if (key in target) {
					return target[key];
				} else {
					throw new Error(`[Vue wran]: Property or method '${key}' is not defined on the instance but referenced during render.Make sure to declare reactive data properties in the data option.`);
				}
			},
			set(target, key, val) {
				target[key] = val;
			},
			has() {

			},
			deletePropety() {

			}
		});
		_container.$el = document.querySelector(json.el);
		_container.$data = data;
		_container.$methods = json.methods || {};
		_container.render = render.bind(_container);
		// _container.render.call(_container);
		_container.render(this);
	}
}

function _evalStr(s, $data) {
	let k = s.replace(/\w+/g, (s) => {
		return '$data.' + s;
	});
	return eval(k);
}
function render(_this) {
	// console.log(this.$el);
	this.$el.innerHTML = this.$el.innerHTML.replace(/\{\{[^\{^\}]+\}\}/g, (str) => {
		let k = str.substring(2, str.length - 2);
		return _evalStr(k, this.$data);
	});

	let aEle = Array.from(this.$el.getElementsByTagName('*'));
	aEle.push(this.$el);
	// console.log(aEle);
	aEle.forEach(el => {
		Array.from(el.attributes).forEach(attr => {
			if (attr.name.startsWith(':') || attr.name.startsWith('v-bind:')) {
				let name = attr.name.substring(attr.name.indexOf(':')+1);
				let value = _evalStr(attr.nodeValue, this.$data);
				if (!value) {
					el.removeAttribute(attr.name);
					el.setAttribute(name, attr.nodeValue);
				} else {
					el.removeAttribute(attr.name);
					el.setAttribute(name, value);
				}
			} else if (attr.name.startsWith('@') || attr.name.startsWith('v-click:')) {
				let name = attr.name.substring(attr.name.indexOf('@')+1);
				let fn = _evalStr(attr.nodeValue, this.$methods);
				// console.log(name, value)
				if (!fn) {
					throw new Error(`no ${attr.nodeValue} method.`);
				} else {
					el.addEventListener(name, fn.bind(_this), false);
				}
			}
		})
	})
}

