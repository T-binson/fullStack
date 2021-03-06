/*
class Shape {
	area: number;
	color: string;
	constructor(public name: string, public width: number, public height: number) {
		this.area = width * height;
		this.color = 'red';
	}
	shoutit() {
		return `the object is ${this.color} ${this.name} having an area of ${this.area} cm squared.`;
	}
}
var square = new Shape('square', 20, 20);
console.log(square.shoutit());
console.log(square.area, square.color);
console.log(square.name, square.width, square.height);
8/

/*
interface Point {
	a: number,
	b: number
}
class Monster {
	constructor(public name: string, public initPosition: Point) {

	}
}
var scaring = new Monster('Alien', {a: 0, b: 0});
*/

/*
class MyReport {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	print() {
		alert('my report:' + this.name);
	}
}
class CashReport extends MyReport {
	constructor(name: string) {
		super(name);
	}
	print() {
		alert('CashReport: ' + this.name);
	}
	getLineItems() {
		alert('5 line items');
	}
}
var myreport = new CashReport("Month's Sales");
myreport.print();
myreport.getLineItems();
*/

class MyClass {
	static instances = 0;
	constructor() {
		MyClass.instances++;
	}
}
var s1 = new MyClass();
var s2 = new MyClass();
console.log(MyClass.instances);

class ClassBase {
	public a: number;
	private b: number;
	protected c: number;
}
var foo = new ClassBase();
foo.a;
foo.b;	//error
foo.c;	//error
class ClassChild extends ClassBase {
	constructor() {
		super();
		this.a;
		this.b;	//error
		this.c;
	}
}
