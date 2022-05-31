// Key press listener process
import { commandExec } from '../processes/commExec.process.js';
import { filesObject } from '../resources.js';
import { tableRender, getCurrentFilesList } from '../handlers/tableRender.handler.js';

export const inputListenerProcess = () => {

	//Triggering actions without Enter key
	if (process.stdin.isTTY) process.stdin.setRawMode(true);
	// Continues process after key press
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	process.stdin.on('data', (key) => {
		if (key.toString() === '\u0071') {
			// Quit
			process.exit();
			return;
		} else if (key.toString() === '\u001B\u005B\u0041') {
			// up
			for (let i = 0; i < filesObject.length; i++) {
				
				if ( filesObject[i]?.selected === true && i>0 ) {				
					filesObject[i].selected = false;
					filesObject[i - 1].selected = true;			
					//commandExec('clearCMD');		
					tableRender();
					return;
				}
			}			
		} else if (key.toString() === '\u001B\u005B\u0042') {
			// Down
			for (let i = 0; i < filesObject.length; i++) {
				if (filesObject[i]?.selected === true && i < filesObject.length-1) {					
					filesObject[i].selected = false;
					filesObject[i + 1].selected = true;
					//commandExec('clearCMD');
					tableRender();
					return;
				}
			}
			//console.log('');
		} else if (key.toString() === '\u006F') {
			const file = filesObject.find((element) => element?.selected === true);
			// Open
			if (file?.type === 'file') {						
				commandExec('openInEditor', file?.name);
				return;
			}	
			commandExec('cdForward', file?.name);
			getCurrentFilesList();
			tableRender();
			return;
		} else if (key.toString() == '\u0064') {
			const file = filesObject.find((element) => element?.selected === true);
			// Delete
			commandExec(file?.type === 'dir' ? 'deleteDirectory' : 'deleteFile', file?.name);
			getCurrentFilesList();
			tableRender();
			return;
		} else {
			// If none of the above just output the key value.
			console.log(key);
		}
	});
};

// '\u001B\u005B\u0041' - 'up'
// '\u001B\u005B\u0043' - 'right'
// '\u001B\u005B\u0042' - 'down'
// '\u001B\u005B\u0044' - 'left'
