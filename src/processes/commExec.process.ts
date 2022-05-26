// Command execution process.
import { exec } from 'child_process';
import { filesObject  } from '../filesObject.js';

export const commandExec = (command: string, ...args: any ) => {
	if(args){
	exec(`${command}${args}`, async (error, stdout, stderr) => {	
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		stdout.split('\r\n').forEach((e) => console.log(e));
	});
	}else{
		exec(`${command}`, async (error, stdout, stderr) => {	
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			stdout.split('\r\n').forEach(e => 
			filesObject.push({
				name: e, 
				type: command==='getDirectories'? 'dir' : 'file',
				selected: false
			}
				));
		});
	}
}