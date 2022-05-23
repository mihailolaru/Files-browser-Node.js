// chalk is used to color the output.
import chalk from "chalk";
import boxen from 'boxen';

const printError = (error: string) => {
  console.log(chalk.bgRed(" error "), error);
};

const printSuccess = (message: string) => {
  console.log(chalk.bgGreen(" SUCCESS "), message);
};

//dedent is used to remove extra indentation.
const printHelp = () => {
  console.log(
   `${chalk.bgCyan("Available key command")}
		Use the following keys for:
		q - quit
		d - delete
		arrows keys - to navigate					
		` 
  );
};

const renderer = (commands: any) => {
	console.log(boxen('Test box', {padding: 1}));
};

export { printError, printSuccess, printHelp, renderer };
