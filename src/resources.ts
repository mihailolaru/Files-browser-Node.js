import os from 'os';

const commandsList = {
	wind32: {
		cdBack: 'cd ..',
		cdForward: 'cd ',
		currentDirPath: 'cd',
		deleteFile: 'del ',
		deleteDirectory: 'echo y | rmdir /s ',
		getDirectories: 'dir /ad/b',
		getFiles: 'dir /a-d/b',
		openInEditor: 'notepad ',
		// For the implementation with write to file. START
		deleteDirectoryStatic: 'del %LOCALAPPDATA%\\cliTestFiles -y',
		writeToFileStatic: 'dir /b > %LOCALAPPDATA%\\cliTestFiles\\filesList.txt',
		getDirectoriesStatic: 'dir /ad > %LOCALAPPDATA%\\cliTestFiles\\directories.txt',
		getFilesStatic: 'dir /a-df > %LOCALAPPDATA%\\cliTestFiles\\files.txt',
	},
	linux: {
		cdBack: 'cd ..',
		cdForward: 'cd ',
		currentDirPath: 'pwd',
		deleteFile: 'rm ',
		deleteDirectory: 'rm -r ',
		getDirectories: 'ls -d */',
		getFiles: 'ls -ap | grep -v /',
		openInEditor: 'nano ',
		// For the implementation with write to file. START
		deleteDirectoryStatic: 'rm -r /home/cliTestFiles',
		writeToFileStatic: 'cat > /home/cliTestFiles/filesList.txt',
		getDirectoriesStatic: 'ls -d */ > /home/cliTestFiles/directories.txt',
		getFilesStatic: 'ls -p | grep -v / > /home/cliTestFiles/files.txt',
	},
};

export const COMMANDS = os.platform() === 'win32' ? commandsList.wind32 : commandsList.linux;

export let filesObject = [];
