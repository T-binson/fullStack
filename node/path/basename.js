// Windows vs. POSIX

// path.basename(path[, ext])
const path = require('path');
let basename = path.basename('../add.js');
let basenameExt = path.basename('../add.js','.js');
console.log(basename);//add.js 获取文件名
console.log(basenameExt);//add

// path.delimiter
console.log(path.delimiter);//';'获取路径分隔符
console.log(process.env.path.split(path.delimiter));
/*['C:\\ProgramData\\Oracle\\Java\\javapath',
  'C:\\WINDOWS\\system32',
  'C:\\WINDOWS',
  'C:\\WINDOWS\\System32\\Wbem',
  'C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\',
  'C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common',
  'C:\\WINDOWS\\system32',
  'C:\\WINDOWS',
  'C:\\WINDOWS\\System32\\Wbem',
  'C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\',
  'C:\\Users\\T-Bin\\AppData\\Local\\Microsoft\\WindowsApps',
  'E:\\360Downloads\\Sublime Text 3',
  'C:\\dev\\nvm\\npm',
  'C:\\dev\\nvm',
  'C:\\dev\\nodejs',
  '']*/

// path.dirname(path) 获取文件所在目录
console.log(path.dirname('./basename.js'));

// path.extname(path) 获取文件扩展名
console.log(path.extname('./basename.js'));

// path.parse(path) 把路径转换成对象
let pathobj = path.parse('../add.js');
console.log(pathobj);

// path.format(pathObject) 格式化路径对象
console.log(path.format(pathobj));

// path.isAbsolute(path) 判断是否是绝对路径

// path.join([...paths]) 拼接路径

// path.normalize(path) 常规化路径

// path.relative(from, to) 获取第二个路径相对第一个路径的相对路径

// path.resolve([...paths]) 以类似命令行cd命令的方式拼接路径

// path.sep 获取不同平台中路径的分隔符（默认）

// path.win32
// path.posix