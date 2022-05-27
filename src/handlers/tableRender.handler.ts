import figlet from 'figlet';
import { inputRequest } from './input.handler.js';
import { filesObject } from '../filesObject.js';
import { commandExec } from '../processes/commExec.process.js';
// Style the console log
import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent-js';

export const tableRender = () => {
	commandExec('clearCMD');
	
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
				filesObject.forEach((item) => {
					if (item?.selected === true) console.log(chalk.bgGreen(item));
					if (item?.type === 'dir') console.log(chalk.red(item?.name));
					console.log(chalk.blue(item?.name));
				});
			}
		},
	);
};

// Consider using this for table rendering.
//for (let i = 0; i <= process.stdout.columns - 1; i++) {
// 	if (process.stdout.columns == 10) process.stdout.write('+');
// 	process.stdout.write('-');
// }
