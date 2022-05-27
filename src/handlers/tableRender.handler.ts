// Table rendering logic

import figlet from 'figlet';
import { filesObject } from '../resources.js';
import { commandExec } from '../processes/commExec.process.js';

// Style the console log
import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent-js';

export const tableRender = () => {
	commandExec('clearCMD');
	commandExec('getDirectories');
	commandExec('getFiles');

	figlet.text(
		'File Manager',
		{
			horizontalLayout: 'default',
			verticalLayout: 'default',
			width: 80,
			whitespaceBreak: true,
		},
		function (err, title) {
			if (err) {
				console.log('Could non display the title...');
				console.dir(err);
				return;
			}
			// Display title
			console.log(title);
			// Display the controls list
			console.log(
				boxen(dedent`Up/Down arrows keys - to navigate \n o - open \n d - delete \n q - quit`, {
					title: chalk.bgCyan('Available key commands:'),
					titleAlignment: 'center',
					padding: 1,
					margin: 1,
					borderStyle: 'double',
				}),
			);

			//List the files list. If any in the filesObject.
			if (filesObject.length > 0) {				
				//Check if no elements are selected in the array, set as selected the first element.
				if (filesObject.filter((element) => element?.selected === true)?.length === 0)
					filesObject[0].selected = true;

				for( let i = 0; i<filesObject.length-1; i++ ){		
					let selected = filesObject[i]?.selected;	

					if (filesObject[i]?.type === 'dir') console.log(selected ? chalk.bgGreen(chalk.red(filesObject?.[i]?.name)) : chalk.red(filesObject[i].name));

					if (filesObject[i]?.type === 'file') console.log(selected ? chalk.bgGreen(chalk.blue(filesObject?.[i]?.name)) : chalk.blue(filesObject?.[i]?.name));			
				}
			}
		},
	);
};
