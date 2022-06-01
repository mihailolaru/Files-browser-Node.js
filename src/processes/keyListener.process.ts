// Key press listener process
import { commandExec } from '../processes/commExec.process.js';
import { filesObject } from '../resources.js';
import { tableRender, getCurrentFilesList } from '../handlers/tableRender.handler.js';

export const inputListenerProcess = () => {
    //Triggering actions without Enter key
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    // Continues process after key press
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', async (key) => {
        if (key.toString() === '\u0071') {
            // Quit
            process.exit();
            return;
        } else if (key.toString() === '\u001B\u005B\u0041') {
            // Up
            for (let i = 0; i < filesObject.length; i++) {
                if (filesObject[i]?.selected === true && i > 0) {
                    filesObject[i].selected = false;
                    filesObject[i - 1].selected = true;
                    tableRender();
                    return;
                }
            }
        } else if (key.toString() === '\u001B\u005B\u0042') {
            // Down
            for (let i = 0; i < filesObject.length; i++) {
                if (filesObject[i]?.selected === true && i < filesObject.length - 1) {
                    filesObject[i].selected = false;
                    filesObject[i + 1].selected = true;
                    tableRender();
                    return;
                }
            }
        } else if (key.toString() === '\u006F') {
            // Selected file
            const file = filesObject.find((element) => element?.selected === true);
            // Open
            if (file?.type === 'file') {
                await commandExec('openInEditor', file?.name);
                return;
            }
            await commandExec(
                file?.name === '..' ? 'cdBack' : 'cdForward',
                file?.name === '..' ? null : file?.name,
            ).then(() => getCurrentFilesList());
            return;
        } else if (key.toString() === '\uE007') {
            console.log('ENTER key');
            return;
        } else if (key.toString() == '\u0064') {
            // Selected file
            const file = filesObject.find((element) => element?.selected === true);

            // Delete command
            commandExec(file?.type === 'dir' ? 'deleteDirectory' : 'deleteFile', file?.name);
            getCurrentFilesList();
            return;
        } else {
            // If none of the above just output the key value.
            console.log(key);
        }
    });
};

// '\u001B\u005B\u0041' - 'up'
// '\u001B\u005B\u0043' - 'right'
// '\u001B\u005B\u0042' - 'down'
// '\u001B\u005B\u0044' - 'left'
// '\u2386' - 'enter'
