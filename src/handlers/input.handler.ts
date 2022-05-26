import inquirer from 'inquirer';
import { tableRenderer } from '../handlers/log.handler.js';

export const inputRequest = () => { 
  inquirer.prompt([
      {
        name: 'input',
        message: 'Command:'
      },
    ])
    .then(answer => {
      //console.log(answer.input)
      const a = answer.input.trim;

      switch(a){
        case a==='o':
          tableRenderer('openInEditor');
          break;
        case a === 'd':
          tableRenderer('openInEditor');
          break;

    }
    );
}