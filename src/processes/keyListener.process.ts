/** Key press listener process */
import { commandExec } from '../processes/commExec.process.js';
import { filesObject } from '../filesObject.js';

export const inputListenerProcess = () => {	
	//Triggering actions without Enter key
	if (process.stdin.isTTY) process.stdin.setRawMode(true);
	// Continues process after key press
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	process.stdin.on('data', (key) => {
		if (key.toString() === '\u0071') {
			console.log(key);
			process.exit();
		} else if (key.toString() === '\u001B\u005B\u0041') {
			process.stdout.write('up');				
		} else if (key.toString() == '\u001B\u005B\u0042') {
			process.stdout.write('down'); 
		} else if (key.toString() == '\u006F') {
			process.stdout.write('open'); 
		}	else if (key.toString() == '\u0064') {
			process.stdout.write('delete'); 
		} else {
			console.log(key);
		}
	});

}	

	
// '\u001B\u005B\u0041' - 'up'     
// '\u001B\u005B\u0043' - 'right' 
// '\u001B\u005B\u0042' - 'down'
// '\u001B\u005B\u0044' - 'left' 
