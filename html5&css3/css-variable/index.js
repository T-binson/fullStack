const box = document.querySelector('.box');
const boxStyle = getComputedStyle(box);
//获取值
const boxBorderColor = boxStyle.getPropertyValue('--box-border-color');
//设置值
box.style.setProperty('--box-border-color','#06c');