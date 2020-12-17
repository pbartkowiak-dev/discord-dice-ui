import { L5R_REROLL_REQUESTED, l5rDiceRerolled } from '../actions/l5r.actions';
import { RING_DIE, SKILL_DIE } from '../consts/diceConstants';
import getDieNumberVal from '../utils/getDieNumberVal';
import getResultsArray from '../utils/getResultsArray';
import mapValueToL5r from './utils/mapValueToL5r';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === L5R_REROLL_REQUESTED) {
		const state = store.getState();
		const rerollIndexes = action.payload;
		const { l5rData } = state;
		const { results } = l5rData;

		const resultsRerolled = results.map((result: string, index: number) => {
			if (!rerollIndexes.includes(index)) {
				return result;
			}

			const diceType = result.includes(RING_DIE) ? RING_DIE : SKILL_DIE;
			const diceTypeNum = getDieNumberVal(diceType);
			const numValue = getResultsArray(diceTypeNum, 1)[0];
			const newResult = mapValueToL5r(diceType, numValue);
			return newResult;
		});

		store.dispatch(l5rDiceRerolled(resultsRerolled));
	} else {
		next(action);
	}
};
