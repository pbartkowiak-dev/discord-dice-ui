import { L5R_ALTER_DIE } from '../actions/l5r.actions';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === L5R_ALTER_DIE) {
		const state = store.getState();
		const { index, setTo } = action.payload;
		const { l5rData } = state;
		const { resultsKept, resultsKeptIndexesAltered } = l5rData;
		const resultsKeptAltered = [...resultsKept];
		const resultsKeptIndexesAlteredClone = [...resultsKeptIndexesAltered];
		resultsKeptAltered[index] = setTo;

		if (!resultsKeptIndexesAltered.includes(index)) {
			resultsKeptIndexesAlteredClone.push(index);
		}
		action.payload = {
			resultsKept: resultsKeptAltered,
			resultsKeptIndexesAltered: resultsKeptIndexesAlteredClone
		};
	}
	next(action);
};
