import { REQUEST_MSG_READY } from '../actions/roll.actions';

// type fieldEmbedded = {
// 	name: string,
// 	value: string
// }

// export type requestParams = {
// 	hookUrl: string,
// 	msgTitle: string,
// 	color: number,
// 	fields: Array<fieldEmbedded>,
// 	description: string
// }

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === REQUEST_MSG_READY) {
		const state = store.getState();
		const { userSettings : { hookUrl } } = state;
		const { payload } = action;
		const {
			msgTitle,
			color,
			fields,
			description
		} = payload;

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
	next(action);
};
