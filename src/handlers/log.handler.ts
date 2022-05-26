/** Logging logic.*/

import boxen from 'boxen';
import chalk from 'chalk';
import os from 'os';
import { appTitle } from '../handlers/title.handler.js';
import { COMMANDS } from '../commands.js';
import { exec } from 'child_process';

export const printError = (error: string) => {
	console.log(chalk.bgRed(' error '), error);
};

export const printSuccess = (message: string) => {
	console.log(chalk.bgGreen(' SUCCESS '), message);
};

export const printInfo = () => {
	console.log(
		`${chalk.bgCyan('Available key commands:')}		
		q - quit
		d - delete
		arrows keys - to navigate					
		`,
	);
};

export const tableRenderer = (key: string, fileName?: string) => {
	let commands = os.platform() === 'win32' ? COMMANDS.wind32 : COMMANDS.linux;
	//console.log(boxen('Test box', { padding: 1 }));

	for (let i = 0; i <= process.stdout.columns - 1; i++) {
		if (process.stdout.columns == 10) process.stdout.write('+');
		process.stdout.write('-');
	}

	//TODO put the "/" in front of the fileName
	//Include here the command from the passed args.

	exec(`${commands?.[key]}${fileName || ''}`, async (error, stdout, stderr) => {
		//appTitle('FileManager');
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
};
