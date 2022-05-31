// Commands execution process
import os from 'os';
import child_process from 'child_process';
import { tableRender, getCurrentFilesList } from '../handlers/tableRender.handler.js';
import { filesObject, COMMANDS } from '../resources.js';

export const commandExec = (key?: string, filename?: string) => {
	console.log('commandExec() key: ', key);

	if(key === 'openInEditor'){
		const child = child_process.spawn('nano', [filename], {
			stdio: 'inherit'
		});

		child.on('exit', () => {
			getCurrentFilesList();
			tableRender();
		});
	}

	child_process.exec(`${COMMANDS[key === '..' ? 'cdBack' : key]}${filename || ''}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		if (key === 'getDirectories' || key === 'getFiles') {
			const filesList = stdout.split(os.platform() === 'win32' ? '\r\n' : '\n');

			for (let i = 0; i < filesList.length - 1; i++) {
				filesObject.push({
					name: filesList[i],
					type: key === 'getDirectories' ? 'dir' : 'file',
					selected: false,
				});
			}
		}
		console.log('stdout', stdout);
		return stdout;
	});

	
	
};
