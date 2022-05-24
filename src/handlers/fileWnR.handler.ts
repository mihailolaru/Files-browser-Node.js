import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

const fileExistsCheck = async (path: string) => {
	try{
		await promises.stat(path);
		return true;
	}catch(e){
		return false;
	}
};

const writeToFile = async ( key: string, value: string ) => {
	interface Data {
		[key: string]: string | undefined
	  };
	//Data that will be written to the file.
	let data: Data = {};
	//Check if the file exists ion order not to overwrite it.
	if(await fileExistsCheck(filePath)){
		const file = await promises.readFile(filePath);
		//Parse the file to JSON.
		data = JSON.parse(JSON.stringify(file));
	}

	data[key] = value;

	//Since promises.writeFile does not accept objects as a parameter, we need to convert it to a string.
	await promises.writeFile(filePath, JSON.stringify(data));	
};

//Get data from the storage.
const readFromFile = async (key: string) => {
	if(await fileExistsCheck(filePath)){
		const file = await promises.readFile(filePath);
		//Parse the file to JSON.
		const data = JSON.parse(JSON.stringify(file));
		return(data[key]);
	}
	return undefined;

};



export { writeToFile, readFromFile };