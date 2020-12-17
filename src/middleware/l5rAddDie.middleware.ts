import { L5R_ADD_DIE } from '../actions/l5r.actions';
import { ROLLED_DIE, KEPT_DIE } from '../consts/consts';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === L5R_ADD_DIE) {
		const state = store.getState();
		const { type, setTo } = action.payload;
		const { l5rData } = state;
		const { results, resultsKept } = l5rData;
		const resultsClone = [...results];
		const resultsKeptClone = [...resultsKept];

		if (type === ROLLED_DIE) {
			resultsClone.push(setTo);
		} else if (type === KEPT_DIE) {
			resultsKeptClone.push(setTo);
		}

		action.payload = {
			results: resultsClone,
			resultsKept: resultsKeptClone
		};
	}
	next(action);
};
