// Key press listener process
import { commandExec } from '../processes/commExec.process.js';
import { filesObject } from '../resources.js';
import { tableRender, getCurrentFilesList } from '../handlers/tableRender.handler.js';
import readline from 'readline';
import trash from 'trash';

const deleteConfirm = (loading: boolean) => {
	// Stop the current on data listener
	process.stdin.removeAllListeners('data');

	loading = true;

	// Get the selected file
	const file = filesObject.find((element) => element?.selected === true);

	// Prevent the '..' element to be deleted
	if (file?.name !== '..') {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question(
			`To confirm deletion of ${file?.name} type 'y' then Enter or any other key followed by Enter to abort: `,
			async (answer) => {
				if (answer.toLowerCase().trim() === 'y') {
					await trash(file?.name);
					rl.close();
				} else {
					rl.close();
				}
			},
		);
		//After closing the readline instance relaunch the on data listener, rerender the table and set loading to false.
		rl.on('close', function () {
			inputListenerProcess();
			getCurrentFilesList();
			loading = false;
			return;
		});
	}
	// If user trying to remove the '..' element, just return.
	loading = false;
	return;
};

export const inputListenerProcess = () => {
	// Triggering actions without Enter key
	if (process.stdin.isTTY) process.stdin.setRawMode(true);
	// Continues process after key press
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	process.stdin.on('data', async (key) => {
		let loading = false;
		if (key.toString() === '\u0071') {
			// Quit app
			//console.clear();
			console.log('\x1Bc');
			process.exit();
		} else if (key.toString() === '\u001B\u005B\u0041') {		
			// Up arrow key
			if (loading === false) {
				loading = true;
				for (let i = 0; i < filesObject.length; i++) {
					if (filesObject[i]?.selected === true && i > 0) {
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
				loading = true;
				for (let i = 0; i < filesObject.length; i++) {
					if (filesObject[i]?.selected === true && i < filesObject.length - 1) {
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
				loading = true;
				// Selected file
				const file = filesObject.find((element) => element?.selected === true);
				// Open
				if (file?.type === 'file') {
					commandExec('openInEditor', file?.name);
					loading = false;
					return;
				}
				await commandExec(file?.name === '..' ? 'cdBack' : 'cdForward', file?.name);
				getCurrentFilesList();
				loading = false;
				return;
			}
			return;
		} else if (key.toString() === '\u0064') {
			if (loading === false) {
				deleteConfirm(loading);
			}
			return;
		} else {
			return;
		}
	});
};
