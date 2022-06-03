// Commands execution process
import os from 'os';
import child_process from 'child_process';
import { getCurrentFilesList } from '../handlers/tableRender.handler.js';
import { filesObject, COMMANDS } from '../resources.js';

export const commandExec = (key?: string, filename?: string) => {
	console.log('-> commandExec() -> key: ', key, ', filename: ', filename);
	console.log('');

	return new Promise((resolve, reject) => {
		// Spawning a child process for the text editor.
		if (key === 'openInEditor') {
			const child = child_process.spawn(
				os.platform() === 'win32' ? 'notepad' : 'nano',
				[filename],
				{
					stdio: 'inherit',
				},
			);			

			child.on('exit', () => {
				getCurrentFilesList();				
			});

			return;
		}

		//https://stackoverflow.com/questions/15629923/nodejs-exec-does-not-work-for-cd-shell-cmd
		// exec() with change working directory arg for changing directory commands.
		if (key === 'cdBack' || key === 'cdForward') {
			process.chdir(filename);
			getCurrentFilesList();
			return;
		}

		// Executing the basic commands with exec()
		child_process.exec(`${COMMANDS[key]}${filename || ''}`, (error, stdout, stderr) => {
			if (error) {
				reject(`error: ${error.message}`);
			}
			if (stderr) {
				reject(`stderr: ${stderr}`);
			}

			// Pushing the directories and files to the filesObject.
			if (key === 'getDirectories' || key === 'getFiles') {
				const fileNames = stdout
					.split(os.platform() === 'win32' ? '\r\n' : '\n')
					.filter((item) => item !== '');

				console.log('-> if getDirectories || getFiles stdout: \n', stdout);
				console.log('');

				if (fileNames.length > 0) {
					console.log('-> commandExec() filesList: ', fileNames);
					console.log('');

					for (let i = 0; i < fileNames.length; i++) {
						filesObject.push({
							name: fileNames[i],
							type: key === 'getDirectories' ? 'dir' : 'file',
							selected: false,
						});
					}
				}
				//return;
			}

			// In case of success, returning the stdout. For now, this is used only for displaying the path to the current directory.
			resolve(stdout.trim());
		});
	});
};
