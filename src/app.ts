import os from 'os';
import figlet from 'figlet';
import { getCurrentFilesList } from './handlers/tableRender.handler.js';
import { inputListenerProcess } from './processes/keyListener.process.js';

const initCli = () => {
    if (os.platform() === 'win32' || os.platform() === 'linux') {    
        // Initialize the key press listener process.
        inputListenerProcess();
        // Getting the current directory content and rendering the table.
        getCurrentFilesList();      
    } else {
        // In case of not supported OS display a warning message and close the app in 10 seconds.
        figlet.text(
            'ERROR. The OS is not supported. \n The app will auto shut down in 10 seconds.',
            {
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true,
            },
            function (err, title) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(title);
                return;
            },
        );
        setTimeout(process.exit(), 10000);
    }
};

initCli();
