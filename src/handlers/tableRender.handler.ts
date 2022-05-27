// Table rendering logic

import figlet from 'figlet';
// @ts-ignore
import { filesObject } from '../resources.js';
// @ts-ignore
import { commandExec } from '../processes/commExec.process.js';

// Style the console log
import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent-js';

export const tableRender = async () => {
	await commandExec('clearCMD');
	await commandExec('getDirectories');
	await commandExec('clearCMD');

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
				if (filesObject.filter((element) => element.selected === true).length > 0)
					filesObject[0].selected = true;

				filesObject.forEach((item) => {
					if (item?.selected === true) console.log(chalk.bgGreen(item));
					if (item?.type === 'dir') console.log(chalk.red(item?.name));
					console.log(chalk.blue(item?.name));
				});
			}
		},
	);
};
