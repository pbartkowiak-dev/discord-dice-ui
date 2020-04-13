type fieldEmbeded = {
	name: string,
	value: string
}

export type requestParams = {
	hookUrl: string,
	msgTitle: string,
	color: number,
	fields: Array<fieldEmbeded>
}

function request ({
	hookUrl,
	msgTitle,
	color,
	fields
}: requestParams) {
	if (hookUrl) {
		const msg = {
			username: "Dice Roller",
			embeds: [{
				title: msgTitle,
				color,
				fields
			}]
		};

		const data = {
			method: "POST",
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
