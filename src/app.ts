import os from 'os';
import { appTitle } from './handlers/title.handler.js';
import { inputListenerProcess } from './processes/keyListener.process.js';
import { tableRenderer } from './handlers/log.handler.js';

const initCli = () => {
	if (os.platform() === 'win32' || os.platform() === 'linux') {
		appTitle('TITLE')
		//tableRenderer('listFiles');			
		inputListenerProcess();
	} else {
		appTitle('ERROR. The OS is not supported');
		return;
	}
};

initCli();
