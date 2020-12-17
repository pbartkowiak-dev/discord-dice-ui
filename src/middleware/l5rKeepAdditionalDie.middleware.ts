import { L5R_KEEP_ADDITIONAL_DIE } from '../actions/l5r.actions';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === L5R_KEEP_ADDITIONAL_DIE) {
		const state = store.getState();
		const { l5rData } = state;
		const { additionalDiceIndexesKept, additionalDiceIndexesDropped } = l5rData;
		const { decision, index } = action.payload;

		const additionalDiceIndexesKeptClone = [...additionalDiceIndexesKept];
		const additionalDiceIndexesDroppedClone = [...additionalDiceIndexesDropped];

		if (decision) {
			additionalDiceIndexesKeptClone.push(index);
		} else {
			additionalDiceIndexesDroppedClone.push(index);
		}

		action.payload = {
			additionalDiceIndexesKept: additionalDiceIndexesKeptClone,
			additionalDiceIndexesDropped: additionalDiceIndexesDroppedClone
		};
	}
	next(action);
};
