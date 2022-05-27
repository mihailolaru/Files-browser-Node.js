// Command execution process.
import { exec } from 'child_process';
import { filesObject } from '../filesObject.js';
import { COMMANDS } from '../commands.js';

export const commandExec = (key?: string, filename?: string) => {
	if (key) {
		exec(`${COMMANDS[key]}${filename||""}`, async (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			if (key === 'getDirectories' || key === 'getFiles') {
				stdout.split('\r\n').forEach(e =>
					filesObject.push({
						name: e,
						type: key === 'getDirectories' ? 'dir' : 'file',
						selected: false,
					}),
				);
			}
		});
	}
};
