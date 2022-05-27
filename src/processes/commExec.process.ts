// Commands execution process

import { exec } from 'child_process';
// @ts-ignore
import { filesObject } from '../resources.ts';
// @ts-ignore
import { COMMANDS } from '../resources.ts';

export const commandExec = (key?: string, filename?: string): Promise<boolean> => {
	if (key) {
		exec( `${COMMANDS[key]}${filename||""}`, async ( error, stdout, stderr ) => {
			if ( error ) {
				console.log(`error: ${error.message}`);
				return false;
			}
			if ( stderr ) {
				console.log(`stderr: ${stderr}`);
				return false;
			}
			if ( key === 'getDirectories' || key === 'getFiles' ) {
				stdout.split('\r\n').forEach(e =>
					filesObject.push({
						name: e,
						type: key === 'getDirectories' ? 'dir' : 'file',
						selected: false,
					}),
				);
				return true;
			}
		});
	}
	return;
};
