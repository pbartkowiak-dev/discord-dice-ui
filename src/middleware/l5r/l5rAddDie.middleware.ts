import { L5R_ADD_DIE } from '../../actions/l5r.actions';
import { ROLLED_DIE, KEPT_DIE } from '../../consts/consts';
import { RING_DIE } from '../../consts/diceConstants';
import getResultsArray from '../../utils/getResultsArray';
import mapValueToL5r from '../utils/mapValueToL5r';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === L5R_ADD_DIE) {
		const state = store.getState();
		const { type, setTo } = action.payload;
		const { l5rData } = state;
		const { results, resultsKept } = l5rData;
		const resultsClone = [...results];
		const resultsKeptClone = [...resultsKept];
		let newResult

		if (setTo) {
			newResult = setTo;
		} else {
			// 6 = Ring die
			const numValue = getResultsArray(6, 1)[0];
			newResult = mapValueToL5r(RING_DIE, numValue);
		}

		if (type === ROLLED_DIE) {
			resultsClone.push(newResult);
		} else if (type === KEPT_DIE) {
			resultsKeptClone.push(newResult);
		}

		action.payload = {
			results: resultsClone,
			resultsKept: resultsKeptClone
		};
	}
	next(action);
};
