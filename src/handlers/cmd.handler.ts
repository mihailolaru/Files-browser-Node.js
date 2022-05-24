/** Listen and Executing terminal commands. */


const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'q') {
    process.exit(); // eslint-disable-line no-process-exit
  } else if (key.name === 'd') {
    //delete file action
  } else if (key.ctrl && key.name === 'n'){
    //open nano editor
  }
});

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();
  }
});
console.log('Press any key...');
