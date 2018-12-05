abstract class Shape {
  abstract area():number;
  abstract draw(gd):void;
  hello():void {
    console.log('hello typescript');
  }
}

class Circle extends Shape {
  constructor(private radius:number) {
    super();
  }
  area():number {
    return Math.PI * Math.pow(this.radius, 2);
  }
  draw(gd):void {
    gd.beginPath();
    gd.arc(100, 100, this.radius, 0, Math.PI *2, true);
  }
}

let c = new Circle(10);
c.hello();