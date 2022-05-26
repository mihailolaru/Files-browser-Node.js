import inquirer from 'inquirer';
import { tableRenderer } from '../handlers/log.handler.js';

export const inputRequest = () => { 
inquirer
  .prompt([
    {
      name: 'input',
      message: 'Input command...'
    },
  ])
  .then(answer => {
	  tableRenderer(answer.input);   
  });
}