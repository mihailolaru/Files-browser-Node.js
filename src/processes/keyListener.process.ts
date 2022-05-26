/** Key press listener process */
import { tableRenderer } from '../handlers/log.handler.js';

export const inputListenerProcess = () => {	
	const stdin = process.openStdin();
	//stdin.resume();
	stdin.on('keydown', (chunk, key) => {
		process.stdout.write(chunk);
		if(key.name==='c'){
			console.log("test");
			process.exit();
		}
	})	
};

