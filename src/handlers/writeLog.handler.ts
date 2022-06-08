import { promises } from 'fs';
const filePath = './errorLog.txt';

export const writeErrLog = async (err: Error) => {
	if (await fileExists(filePath))await promises.writeFile(filePath, JSON.stringify(err), 'utf8');		
};

//Check if file exists function.
const fileExists = async (path: string) => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};
