import os from 'os';

const commandsList = {
	wind32: {
		currentDirePath: 'cd',
		listAllFiles: 'dir /b',
		deleteFile: 'rm ',
		deleteCliDirectory: 'del -y ',
		getDirectories: 'dir /ad/b',
		getFiles: 'dir /a-d/b',
		filesAndDirect: 'dir /ad/b && dir /a-d/b',
		filterFiles: 'findstr complete... ',
		clearCMD: 'cls',
		openInEditor: 'notepad ',
		exit: 'exit',
		// For the implementation with write to file. START
		deleteDirectoryStatic: 'del %LOCALAPPDATA%\\cliTestFiles -y',
		writeToFileStatic: 'dir /b > %LOCALAPPDATA%\\cliTestFiles\\filesList.txt',
		getListStatic: 'dir /b > %LOCALAPPDATA%\\cliTestFiles\\getList.txt',
		getDirectoriesStatic: 'dir /ad > %LOCALAPPDATA%\\cliTestFiles\\directories.txt',
		getFilesStatic: 'dir /a-df > %LOCALAPPDATA%\\cliTestFiles\\files.txt',
	},
	linux: {
		currentDirePath: 'pwd',
		listFiles: 'ls',
		deleteFile: 'rm ',
		deleteDirectory: 'rm -r ',
		// For the implementation with write to file. START
		deleteDirectory: 'rm -r /home/cliTestFiles',
		writeToFile: 'cat > /home/cliTestFiles/filesList.txt',
		getList: 'ls /b > /home/cliTestFiles/getList.txt',
		getDirectories: 'ls /ad > /home/cliTestFiles/directories.txt',
		getFiles: 'ls /a-d > /home/cliTestFiles/files.txt',
		// For the implementation with write to file. END
		filterFiles: 'grep complete...',
		clearCMD: 'clear',
		openInEditor: 'nano ',
		exit: 'exit',
	},
};

export const COMMANDS = os.platform() === 'win32' ? commandsList.wind32 : commandsList.linux;
