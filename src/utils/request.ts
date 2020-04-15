type fieldEmbedded = {
	name: string,
	value: string
}

export type requestParams = {
	hookUrl: string,
	msgTitle: string,
	color: number,
	fields: Array<fieldEmbedded>,
	description: string
}

function request ({
	hookUrl,
	msgTitle,
	color,
	fields,
	description
}: requestParams) {
	if (hookUrl) {
		const msg = {
			username: 'Dice Roller',
			embeds: [{
				title: msgTitle,
				description,
				color,
				fields
			}]
		};

		const data = {
			method: 'POST',
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(msg)
		};

		// @TODO Add error handling
		fetch(hookUrl, data);
	}
}

export {
	request
};
