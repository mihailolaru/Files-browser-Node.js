import os from 'os';
import { appTitle } from './handlers/title.handler.js';
//import { inputListenerProcess } from './processes/keyListener.process.js';
import { printInfo, tableRenderer } from './handlers/log.handler.js';
import { inputRequest } from './handlers/input.handler.js';

const initCli = () => {
	
	//
	//console.log(typeof process.stdout.columns);

	if (os.platform() === 'win32' || os.platform() === 'linux') {
		appTitle('File Manager');
		tableRenderer('listFiles');
		printInfo();
		inputRequest();
		//inputListenerProcess();
	} else {
		appTitle('ERROR. The OS is not supported');
		return;
	}
};

initCli();
