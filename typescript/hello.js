// alert('hello, typescript!');
function area(shape, width, height) {
    var area = width * height;
    return "the shape is " + shape + " having an area of " + area + " cm squared.";
}
document.body.innerHTML = area('rectangle', 20, 15);
