import figlet from 'figlet';

export const appTitle = (title: string) => {
	figlet.text(
		title,
		{
			horizontalLayout: 'default',
			verticalLayout: 'default',
			width: 80,
			whitespaceBreak: true,
		},
		function (err, data) {
			if (err) {
				console.log('Something went wrong...');
				console.dir(err);
				return;
			}
			console.log(data);
		},
	);
};
