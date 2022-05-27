// Key press listener process
// @ts-ignore
import { commandExec } from '../processes/commExec.process.ts';
// @ts-ignore
import { filesObject } from '../resources.ts';
// @ts-ignore
import { tableRender } from "../handlers/tableRender.handler.ts";

export const inputListenerProcess = () => {	
	//Triggering actions without Enter key
	if (process.stdin.isTTY) process.stdin.setRawMode(true);
	// Continues process after key press
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	process.stdin.on('data', ( key ) => {
		if ( key.toString() === '\u0071' ) {
			// Quit			
			process.exit();
		} else if ( key.toString() === '\u001B\u005B\u0041' ) {
			// up			
			filesObject.forEach((element, index)=>{
				if(element.selected===true&&index<filesObject.length){
					element.selected===false;
					filesObject[index-1].selected===true;
				}
			}); 	
		} else if (key.toString() == '\u001B\u005B\u0042') {
			// Down		
			filesObject.forEach( ( element, index )=>{
				if( element.selected===true && index>filesObject.length ){
					element.selected===false;
					filesObject[index+1].selected===true;
				}
			}); 
		} else if (key.toString() == '\u006F') {
			// Open			
			const file = filesObject.find(element => element.selected > true );
			if(file.type==='file')commandExec('openInEditor', file.name);
			tableRender();
		}	else if ( key.toString() == '\u0064' ) {
			// Delete		
			const file = filesObject.find( element => element.selected > true );
			commandExec( file.type==='dir'? 'deleteDirectory': 'deleteFile', file.name );
		} else {
			console.log( key );
		}
	});
}	

	
// '\u001B\u005B\u0041' - 'up'     
// '\u001B\u005B\u0043' - 'right' 
// '\u001B\u005B\u0042' - 'down'
// '\u001B\u005B\u0044' - 'left' 
