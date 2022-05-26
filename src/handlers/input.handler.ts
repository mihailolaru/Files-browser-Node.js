import inquirer from 'inquirer';
import { tableRenderer } from '../handlers/log.handler.js';

export const inputRequest = () => { 
  inquirer.prompt([
      {
        name: 'input',
        message: 'Command:'
      },
    ])
    .then(answer => 
      //console.log(answer.input)
      tableRenderer(answer.input.trim);
    );
}