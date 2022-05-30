// Table rendering logic
import figlet from 'figlet';
import { filesObject } from '../resources.js';
import { commandExec } from '../processes/commExec.process.js';

// Style the console log
import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent-js';

export const getCurrentFilesList = () => {
	filesObject.length = 0;
	commandExec('getFiles');
	commandExec('getDirectories');
};

const table = () => {
	//List the files list. If any in the filesObject.
	if (filesObject.length > 0 && filesObject?.[0]?.name !== '..') {
		filesObject.unshift({
			name: '..',
			type: 'dir',
			selected: false,
		});

		//Check if no elements are selected in the array, set as selected the first element.
		if (filesObject.filter((element) => element?.selected === true)?.length === 0) {
			filesObject[1].selected = true;
		}

		for (let i = 0; i < filesObject.length; i++) {
			let selected = filesObject[i]?.selected;
			//Check if a directory is selected.
			if (filesObject[i]?.type === 'dir')
				console.log(
					selected
						? chalk.bgGreen(chalk.red(filesObject?.[i]?.name))
						: chalk.redBright(filesObject[i]?.name),
				);
			//Check if a file is selected.
			if (filesObject[i]?.type === 'file')
				console.log(
					selected
						? chalk.bgGreen(chalk.blue(filesObject?.[i]?.name))
						: chalk.cyanBright(filesObject?.[i]?.name),
				);
		}
	}
};

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

			table();
		},
	);
};
