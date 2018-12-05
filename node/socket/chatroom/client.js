'use strict'

const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question('What\'s your name?\n',(name) => {
	name = name.trim();
	if (!name) {
		// rl.prompt('no name no play');
		throw new Error('no name no play');
	}
	// 建立与服务器的连接
	const client = net.connect({port: 2080},() => {
		// 监听服务端信息
		client.on('data',(chunk) => {
			try {
		        var signal = JSON.parse(chunk.toString().trim());
		        var procotol = signal.procotol;
		        switch (procotol) {
		          case 'boardcast':
		            // console.log('\nboardcast');
		            console.log(`\n${signal.username}: ${signal.message}`);
		            // console.log(signal.message);
		            rl.prompt();
		            break;
		          default:
		            client.write('弄啥咧！你要干的我干不了');
		            break;
		        }
		    } catch (error) {
		        client.write('弄啥咧！');
		    }
		});

		rl.setPrompt(`${name}> `);
		rl.prompt();

		rl.on('line',(line) => {
			let send = {
				procotol: 'boardcast',
				username: name,
				message: line.toString().trim()
			}
			client.write(JSON.stringify(send));
			rl.prompt();

		}).on('close',() => {
			// console.log('Have a great day!');
      		// process.exit(0);
		});
	});
});