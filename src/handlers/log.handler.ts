/** Logging logic.*/

import boxen from 'boxen';
import chalk from 'chalk';
import os from 'os';
import { appTitle } from '../handlers/title.handler.js';
import { COMMANDS } from '../commands.js';
import { commandExec } from '../processes/commExec.process.js'
import dedent from "dedent-js";

export const tableRenderer = (key: string = 'listFiles', fileName?: string) => {

	let commands = os.platform() === 'win32' ? COMMANDS.wind32 : COMMANDS.linux;

	if(key==='listFiles'){
		commandExec();

	}

	//console.log(boxen('Test box', { padding: 1 }));
	switch(key){

		}

	// 
	

	commandExec(commands?.[key]); 	
};

//for (let i = 0; i <= process.stdout.columns - 1; i++) {
	// 	if (process.stdout.columns == 10) process.stdout.write('+');
	// 	process.stdout.write('-');
	// }