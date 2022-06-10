// Table rendering logic
import figlet from 'figlet';
import { filesObject } from '../resources.js';
import { commandExec } from '../processes/commExec.process.js';
import { writeErrLog } from '../handlers/writeLog.handler.js';
import os from 'os';

// Style the console log
import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent-js';

export const getCurrentFilesList = async () => {
	// Clear the files object
	filesObject.length = 0;

	// Adding new data
	await commandExec('getDirectories').catch((err) => writeErrLog(err));
	await commandExec('getFiles').catch((err) => writeErrLog(err));
	tableRender();
};

const table = async () => {
	console.log('+----------------------------------------------------------------------+');
	console.log('                            #  File names  #                            ');
	console.log('+----------------------------------------------------------------------+');
	console.log(
		` Path: ${await commandExec('currentDirPath').catch((err) =>
			writeErrLog(err),
		)}                           `,
	);
	console.log('+----------------------------------------------------------------------+');

	// Include the 'back' object (..) if it is not already included.
	if (filesObject?.[0]?.name !== '..') {
		filesObject.unshift({
			name: '..',
			type: 'dir',
			selected: false,
		});
	}

	//Check if no elements are selected in the array, set as selected the first element.
	if (filesObject.filter((element) => element.selected === true)?.length === 0) {
		filesObject[0].selected = true;
	}

	//Display all the elements.
	for (let i = 0; i < filesObject.length; i++) {
		let selected = filesObject[i]?.selected;
		//Check if a directory is selected.
		if (filesObject[i]?.type === 'dir')
			console.log(
				'',
				selected
					? chalk.bgGreen(chalk.red(filesObject?.[i]?.name))
					: chalk.redBright(filesObject[i]?.name),
				'',
			);
		//Check if a file is selected.
		if (filesObject[i]?.type === 'file')
			console.log(
				'',
				selected
					? chalk.bgGreen(chalk.blue(filesObject?.[i]?.name))
					: chalk.cyanBright(filesObject?.[i]?.name),
				'',
			);
	}
	console.log('+----------------------------------------------------------------------+');
};

export const tableRender = async () => {
	// Clear the console.
	console.log('\x1Bc');

	// Display the main app title.
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
				console.dir(err);
				return;
			}
			if (title) {
				// Display the app title
				console.log(title);

				// Display the controls info list
				console.log(
					boxen(dedent`Up/Down arrows keys - to navigate \n o - open \n d - delete \n q - quit`, {
						title: chalk.bgCyan('Available key commands:'),
						titleAlignment: 'center',
						padding: 1,
						margin: 1,
						borderStyle: 'double',
					}),
				);

				// Display the table
				table();
			}
		},
	);
};
