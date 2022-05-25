/** Key press listener process */
import { renderer } from '../handlers/log.handler.js';
import readline from 'readline';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
	process.stdin.setRawMode(true);
}

export const inputListenerProcess = () => {	
	process.stdin.on('keypress', (str, key) => {
		if (key.ctrl && key.name === 'c') {
			console.log('ctrl+q');
			process.exit(0); // eslint-disable-line no-process-exit
		} else if (key.name === 'd') {
			renderer('deleteFile');
			console.log('pressed d');
			//delete file action
		} else if ( key.name === 'n') {
			console.log('pressed d');

			//open nano editor

		}
	});
};
