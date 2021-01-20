import { L5R_ROLL_REQUESTED, l5rDiceRolled } from '../../actions/l5r.actions';
import { D10, RING_DIE } from '../../consts/diceConstants';
import getDieNumberVal from '../../utils/getDieNumberVal';
import getResultsArray from '../../utils/getResultsArray';
import mapValueToL5r from '../utils/mapValueToL5r';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === L5R_ROLL_REQUESTED) {
		const { pool } = action.payload;
		const results: Array<string | number> = [];
		const diceTypesToRoll: Array<string> = Object.keys(pool);

		diceTypesToRoll
			// @ts-ignore
			.sort((a: string, b: string) => {
				if (a === RING_DIE || b === D10) return -1;
				return 1;
			})
			.forEach((diceType: string) => {
				const diceTypeNum = getDieNumberVal(diceType);
				const diceAmount: number = pool[diceType];
				const resultsArray = getResultsArray(diceTypeNum, diceAmount);
				resultsArray.forEach((value: number) => {
					results.push(
						mapValueToL5r(diceType, value)
					);
				});
			});

		if (Object.keys(results).length) {
			store.dispatch(l5rDiceRolled(results));
		}
	}
	next(action);
};
