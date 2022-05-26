/** Key press listener process */
import { tableRenderer } from '../handlers/log.handler.js';
import readline from 'readline'; 
import tty from 'tty';


export const inputListenerProcess = () => {	
	const stdin = process.openStdin();

	stdin.on('keypress', (chunk, key) => {
		process.stdout.write(chunk);
		if(key && key.ctrl && key.name=='c'){
			console.log("test");
			process.exit();
		}
	})
	// process.stdin.on('keypress', (str, key) => {
		
	// 	}
	// });
};

