import { requestMsgReady } from '../actions/roll.actions';
import { getColor } from '../utils/getColor';
import { UPDATE_CONAN_TOKENS_STATE } from '../actions/conan.actions';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === UPDATE_CONAN_TOKENS_STATE) {
		const { payload: { momentum, doom } } = action;
		const doomNum = Number(doom);
		const momentumNum = Number(momentum);
		const fields = []

		fields.push({
			name: `:skull: Doom: \`${doom}\``,
			value: doomNum === 0 ? '-' : new Array(doomNum).fill(':black_circle:').join(' ')
		});

		fields.push({
			name: `:boom: Momentum: \`${momentum}\``,
			value: momentumNum === 0 ? '-' : new Array(momentumNum).fill(':yellow_circle:').join(' ')
		});

		store.dispatch(requestMsgReady({
			msgTitle: 'Conan Doom / Momentum Pools',
			fields,
			color: getColor()
		}));
	}
	next(action);
};
