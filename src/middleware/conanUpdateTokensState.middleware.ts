import { requestMsgReady } from '../actions/roll.actions';
import { getColor } from '../utils/getColor';
import { UPDATE_TOKENS_STATE } from '../actions/conan.actions';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === UPDATE_TOKENS_STATE) {
		const { payload: {momentum, doom} } = action;

		const description = `
			:skull: Doom: \`${doom}\`\n
			:boom: Momentum: \`${momentum}\`
		`;

		store.dispatch(requestMsgReady({
			msgTitle: 'Conan Doom / Momentum Pools',
			description,
			color: getColor()
		}));
	}
	next(action);
};
