import figlet from 'figlet';
import { printInfo, tableRenderer } from '../handlers/log.handler.js';
import { inputRequest } from '../handlers/input.handler.js';
import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent-js';

export const appTitle = (title: string) => {
	figlet.text(
		title,
		{
			horizontalLayout: 'default',
			verticalLayout: 'default',
			width: 80,
			whitespaceBreak: true,
		},
		function (err, data) {
			if (err) {
				console.log('Something went wrong...');
				console.dir(err);
				return;
			}
			console.log(data);
			console.log(
				boxen(dedent`Arrows keys - to navigate \n o - open \n d - delete \n q - quit`, {
					title: chalk.bgCyan('Available key commands:'),
					titleAlignment: 'center',
					padding: 1,
					margin: 1,
					borderStyle: 'double',
				}),
			);
			//printInfo();
			tableRenderer('listFiles');
			inputRequest();
		},
	);
};
