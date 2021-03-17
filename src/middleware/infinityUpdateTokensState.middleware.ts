import { requestMsgReady } from '../actions/roll.actions';
import { getColor } from '../utils/getColor';
import { UPDATE_INFINITY_TOKENS_STATE } from '../actions/infinity.actions';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === UPDATE_INFINITY_TOKENS_STATE) {
		const { payload: { momentum, doom } } = action;
		const doomNum = Number(doom);
		const momentumNum = Number(momentum);
		const fields = []

		fields.push({
			name: `:skull: Doom: \`${doom}\``,
			value: doomNum === 0 ? '-' : new Array(doomNum).fill(':black_circle:').join(' ')
		})

		fields.push({
			name: `:boom: Momentum: \`${momentum}\``,
			value: momentumNum === 0 ? '-' : new Array(momentumNum).fill(':yellow_circle:').join(' ')
		})

		store.dispatch(requestMsgReady({
			msgTitle: 'Infinity Momentum Pools',
			fields,
			color: getColor()
		}));
	}
	next(action);
};
