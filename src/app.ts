import os from 'os';
import figlet from 'figlet';
import { tableRender } from './handlers/tableRender.handler.js';
import { inputListenerProcess } from './processes/keyListener.process.js';

const initCli = () => {
	if (os.platform() === 'win32' || os.platform() === 'linux') {
		tableRender();
		inputListenerProcess();
	} else {
		figlet.text(
			'ERROR. The OS is not supported',
			{
				horizontalLayout: 'default',
				verticalLayout: 'default',
				width: 80,
				whitespaceBreak: true,
			},
			function (err, title) {
				if (err) {
					console.log('Something went wrong...');
					console.dir(err);
					return;
				}
				console.log(title);
				return;
			},
		);
	}
};

initCli();
