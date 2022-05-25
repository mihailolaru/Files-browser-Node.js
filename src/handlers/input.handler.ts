import inquirer from 'inquirer';
import { renderer } from '../handlers/log.handler.js';

export const inputRequest = () => { 
inquirer
  .prompt([
    {
      name: 'input',
      message: 'Input command...'
    },
  ])
  .then(answer => {
	  renderer(answer.input);   
  });
}