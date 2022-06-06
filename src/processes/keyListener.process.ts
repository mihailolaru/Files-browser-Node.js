// Key press listener process
import { commandExec } from '../processes/commExec.process.js';
import { filesObject } from '../resources.js';
import { tableRender, getCurrentFilesList } from '../handlers/tableRender.handler.js';
import readline from 'readline';
import trash from 'trash';

export const inputListenerProcess = () => {
	// Triggering actions without Enter key
	if (process.stdin.isTTY) process.stdin.setRawMode(true);
	// Continues process after key press
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	process.stdin.on('data', async (key) => {
		let loading = false;
		if (key.toString() === '\u0071') {
			// Quit app
			console.clear();
			process.exit();
		} else if (key.toString() === '\u001B\u005B\u0041') {
			// Up arrow key
			if (loading === false) {
				for (let i = 0; i < filesObject.length; i++) {
					if (filesObject[i]?.selected === true && i > 0) {
						loading = true;
						filesObject[i].selected = false;
						filesObject[i - 1].selected = true;
						tableRender();
						loading = false;
						return;
					}
				}
			}
			return;
		} else if (key.toString() === '\u001B\u005B\u0042') {
			// Down arrow key.
			if (loading === false) {
				for (let i = 0; i < filesObject.length; i++) {
					if (filesObject[i]?.selected === true && i < filesObject.length - 1) {
						loading = true;
						filesObject[i].selected = false;
						filesObject[i + 1].selected = true;
						tableRender();
						loading = false;
						return;
					}
				}
			}
			return;
		} else if (key.toString() === '\u006F') {
			if (loading === false) {
				// Selected file
				const file = filesObject.find((element) => element?.selected === true);
				// Open
				if (file?.type === 'file') {
					loading = true;
					commandExec('openInEditor', file?.name);
					loading = false;
					return;
				}
				loading = true;
				await commandExec(file?.name === '..' ? 'cdBack' : 'cdForward', file?.name);
				getCurrentFilesList();
				loading = false;
				return;
			}
			return;
		} else if (key.toString() === '\u0064') {
			if (loading === false) {
				loading = true;
				// Selected file
				const file = filesObject.find((element) => element?.selected === true);

				//Delete command
				if (file?.name !== '..') {	
					process.stdin.pause();
					process.stdin.setRawMode(false);				
					rl.question(
						`Confirm deletion of ${file?.name}. Please type 'y' then Enter or any key to abort followed by Enter? `,
						async (answer) => {
							//rl.clearScreenDown(process.stdout);
							if (answer.toLowerCase() === 'y') {
								await trash(file?.name);								
								rl.close();
								//commandExec(file?.type === 'dir' ? 'deleteDirectory' : 'deleteFile', file?.name);
							}						
						},
					);

					rl.on('close', function () {
						process.stdin.resume();
						process.stdin.setRawMode(true);
						getCurrentFilesList();
						loading = false;
						return;
					});
				}

				loading = false;
				return;
			}
			return;
		} else {
			return;
		}
	});
};

// '\u001B\u005B\u0041' - 'up'
// '\u001B\u005B\u0043' - 'right'
// '\u001B\u005B\u0042' - 'down'
// '\u001B\u005B\u0044' - 'left'
