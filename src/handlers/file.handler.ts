import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), '');

const fileExistsCheck = async (path: string) => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};

//Get data from the storage.
export const readFromFile = async (key: string) => {
	if (await fileExistsCheck(filePath)) {
		const file = await promises.readFile(filePath);
		//Parse the file to JSON.
		const data = JSON.parse(JSON.stringify(file));
		return data[key];
	}
	return undefined;
};
