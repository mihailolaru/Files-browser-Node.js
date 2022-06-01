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
                os.platform() === 'win32' ? 'notepad' : 'nano',
                [filename],
                {
                    stdio: 'inherit',
                },
            );

            child.on('exit', () => {
                getCurrentFilesList();
                tableRender();
            });
        }

		// Executing the basic commands with exec()
        child_process.exec(`${COMMANDS[key]}${filename || ''}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
			}
			// Pushing the directories and files to the filesObject.
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
			// In case of success, returning the stdout. For now, this is used only for displaying the path to the current directory.
			resolve(stdout.trim());
        });
    });
};
