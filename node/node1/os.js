const os = require('os');
// let cpu = os.cpus();
// console.log(cpu);

// let memory = os.freemem();
// console.log(memory);

/*let arch = os.arch();
console.log(arch);*/

let homedir = os.homedir();
console.log(homedir);

let hostname = os.hostname();
console.log(hostname);

let platform = os.platform();
console.log(platform);

let release = os.release();
console.log(release);

let type = os.type();
console.log(type);

let userInfo = os.userInfo();
console.log(userInfo);