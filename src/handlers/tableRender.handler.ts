// Table rendering logic
import figlet from 'figlet';
import { filesObject } from '../resources.js';
import { commandExec } from '../processes/commExec.process.js';

// Style the console log
import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent-js';

export const getCurrentFilesList = async () => {
  
	// CLear the files object
    filesObject.length = 0;
    
	// Adding new data
	await commandExec('getDirectories');
	await commandExec('getFiles');
	tableRender();
};

const table = async () => {
	console.log('+--------------------------------------------------------------+');
	console.log('                       #  File names  #                         ');
	console.log('+--------------------------------------------------------------+');
	console.log(` Path: ${await commandExec('currentDirPath')}                   `);
	console.log('+--------------------------------------------------------------+');

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
	console.log('+--------------------------------------------------------------+');	
};

export const tableRender = () => {

	// Clear the console window before a new table is rendered.
    console.clear();

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

			// The app title
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
            
			// The table
			table();
		},
	);
};
