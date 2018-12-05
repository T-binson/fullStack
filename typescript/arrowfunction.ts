var obj = {
    name: 'rectangle',
    popup: function() {
        console.log(`the inside popup(): ${this.name}`);
        setTimeout(() => {
            console.log('the inside setTimeout:' + this.name);
            console.log('the shape is a ' + this.name + '!');
        },3000);
    }
};
obj.popup();

function Person(age) {
	this.age = age;
	this.becomeOld = () => {
		this.age++;
	}
}
var person = new Person(1);
setTimeout(person.becomeOld,1000);
setTimeout(() => {console.log(person.age);},2000);

class People {
	constructor(public age: number) {}
	becomeOld = () => {
		this.age++;
	}
}
var people = new People(1);
setTimeout(people.becomeOld,1000);
setTimeout(function() {console.log(people.age);},2000);
