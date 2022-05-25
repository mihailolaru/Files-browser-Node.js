import os from 'os';
import { appTitle } from './handlers/title.handler.js';
//import { inputListenerProcess } from './processes/keyListener.process.js';
import { printInfo, renderer } from './handlers/log.handler.js';
import { inputRequest } from './handlers/input.handler.js';

const initCli = () => {
	for (let i = 0; i <= process.stdout.columns - 1; i++) {
		if (process.stdout.columns == 10) process.stdout.write('+');
		process.stdout.write('-');
	}
	//
	//console.log(typeof process.stdout.columns);

	if (os.platform() === 'win32' || os.platform() === 'linux') {
		appTitle('File Manager');
		renderer('listFiles');
		printInfo();
		inputRequest();
		//inputListenerProcess();
	} else {
		appTitle('ERROR. The OS is not supported');
		return;
	}
};

initCli();
