import inquirer from 'inquirer';
import { commandExec } from '../processes/commExec.process.js';

export const inputRequest = () => {
	inquirer
		.prompt([
			{
				name: 'input',
				message: 'Command:',
			},
		])
		.then((answer) => {
				const a = answer.input.trim;

			switch (a) {
				case a === 'o':
					commandExec('openInEditor');

					break;
				case a === 'd':
					commandExec('openInEditor');
					break;
			}
		});
    // Insert a new line after the 'Command:'
    console.log('');
};
