/*var obj = {
    name: 'rectangle',
    popup: function () {
        var _this = this;
        console.log("the inside popup(): " + this.name);
        setTimeout(function () {
            console.log('the inside setTimeout:' + _this.name);
            console.log('the shape is a ' + _this.name + '!');
        }, 3000);
    }
};
obj.popup();*/

/*function Person(age) {
    var _this = this;
    this.age = age;
    this.becomeOld = function () {
        _this.age++;
    };
}
var person = new Person(1);
setTimeout(person.becomeOld, 1000);
setTimeout(function () { console.log(person.age); }, 2000);
*/
var People = /** @class */ (function () {
    function People(age) {
        var _this = this;
        this.age = age;
        this.becomeOld = function () {
            _this.age++;
        };
    }
    return People;
}());
var people = new People(1);
setTimeout(people.becomeOld, 1000);
setTimeout(function () { console.log(people.age); }, 2000);
