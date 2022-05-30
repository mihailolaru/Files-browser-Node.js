// Commands execution process
import os from 'os';
import { exec } from 'child_process';
import { filesObject, COMMANDS } from '../resources.js';

export const commandExec = (key?: string, filename?: string) => {
	if (key) {
		console.log('commandExec() key: ', key);
		exec(
			`${COMMANDS[key === '..' ? 'cdBack' : key]}${filename || ''}`,
			async (error, stdout, stderr) => {
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
			},
		);
	}
};
