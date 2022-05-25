import os from 'os';
import { printError, renderer } from './handlers/log.handler';
import commands from './commands.json';

const initCli = () => {
	if (os.platform() === 'win32') {
		console.log('This is windows.');
		return;
		renderer(commands.linux);
	}
	if (os.platform() === 'linux') {
		console.log('this is Linux');
		return;
		renderer(commands.wind32);
	}
	console.log('Your OS is not supported.');
	printError('Your OS is not supported.');
	return; 
};

initCli();
