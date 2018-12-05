import _ from 'lodash';
import './asset/index.css';
import cover from './asset/cover2.jpg';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.setAttribute('class', 'active');
  element.style.background = `url(/${cover})`;

  return element;
}

document.body.appendChild(component());