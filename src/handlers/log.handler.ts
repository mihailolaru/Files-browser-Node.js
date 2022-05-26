/** Logging logic.*/

import boxen from 'boxen';
import chalk from 'chalk';
import os from 'os';
import { appTitle } from '../handlers/title.handler.js';
import { COMMANDS } from '../commands.js';
import { commandExec } from '../processes/commExec.process.js'
import dedent from "dedent-js";

export const printError = (error: string) => {
	console.log(chalk.bgRed(' error '), error);
};

export const printSuccess = (message: string) => {
	console.log(chalk.bgGreen(' SUCCESS '), message);
};

export const printInfo = () => {
	//console.log(boxen('Test box', { padding: 1 }));
	console.log(
		 boxen( dedent`Arrows keys - to navigate \n o - open \n d - delete \n q - quit`, 
		 { title: chalk.bgCyan('Available key commands:'), titleAlignment: 'center', padding: 1, margin: 1, borderStyle: 'double'})
	);
};

export const tableRenderer = (key: string) => {
	let commands = os.platform() === 'win32' ? COMMANDS.wind32 : COMMANDS.linux;
	//console.log(boxen('Test box', { padding: 1 }));
	switch(key){

	}

	for (let i = 0; i <= process.stdout.columns - 1; i++) {
		if (process.stdout.columns == 10) process.stdout.write('+');
		process.stdout.write('-');
	}

	//TODO put the "/" in front of the fileName
	//Include here the command from the passed args.

	commandExec(commands?.[key]); 	
};
