// Commands execution process
import os from 'os';
import child_process from 'child_process';
import { tableRender, getCurrentFilesList } from '../handlers/tableRender.handler.js';
import { filesObject, COMMANDS } from '../resources.js';

export const commandExec = (key?: string, filename?: string) => {
	return new Promise((resolve, reject) => {
		// Spawning a child process for the text editor.
		if (key === 'openInEditor') {
			const child = child_process.spawn(
				os.platform() === 'win32' ? 'notepad' : 'gedit',
				[filename],
				{
					stdio: 'inherit',
				},
			);

			child.on('close', () => {				
				tableRender();					
			});
			return;
		}

		// Changing directory
		if (key === 'cdBack' || key === 'cdForward') {
			// Changing the directory
			process.chdir(filename);		
			getCurrentFilesList();
			return;
		}
		
		// Executing the basic commands with exec()
		child_process.exec(`${COMMANDS[key]}${filename || ''}`, (error, stdout, stderr) => {
			if (error) {
				// The check is done to continue process in case no files or directories are located on the current location.
				if (
					error.message.includes('ls -ap | grep -v /') ||
					error.message.includes('ls -d */') ||
					error.message.includes('File Not Found')
				)
					resolve('No files found');
				reject(`exec() ERROR: ${error.message}`);
			}
			if (stderr) {
				reject(`exec() stderr: ${stderr}`);
			}

			// Pushing the directories and files to the filesObject.
			if (key === 'getDirectories' || key === 'getFiles') {
				const fileNames = stdout
					.split(os.platform() === 'win32' ? '\r\n' : '\n')
					.filter(item => item !== '');

				if (fileNames.length > 0) {
					for (let i = 0; i < fileNames.length; i++) {
						filesObject.push({
							name: fileNames[i],
							type: key === 'getDirectories' ? 'dir' : 'file',
							selected: false,
						});
					}
				}
			}
			// In case of success, returning the stdout. For now, this is used only for displaying the path to the current directory.
			resolve(stdout.trim());
		});	
	});			
};
