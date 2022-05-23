import os from 'os';
import { printError, renderer } from './services/log.services';
import commands from './commands.json'; 


const initCli = () => {
	if(os.platform() === "win32"){
		console.log("This is windows.");
		renderer(commands.linux)
	}
	if( os.platform() === "linux"){
		console.log('this is Linux');
		renderer(commands.wind32);
		
	}
	return printError("Your OS is not supported.");
}

initCli();