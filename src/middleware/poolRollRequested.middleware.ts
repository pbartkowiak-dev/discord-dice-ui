import { DICE_POOL_ROLL_REQUESTED, dicePoolRolled, storeSelectedPool} from '../actions/roll.actions';
import getDieNumberVal from '../utils/getDieNumberVal';
import getResultsArray from '../utils/getResultsArray';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === DICE_POOL_ROLL_REQUESTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const formValues = diceModuleForm?.values || {};
		const { pool } = action.payload;
		const results = {};

		store.dispatch(storeSelectedPool({ pool }));

		Object.keys(pool).forEach((diceType: string) => {
			const diceTypeNum = getDieNumberVal(diceType);
			const diceAmount: number = pool[diceType];
			const resultsArray = getResultsArray(diceTypeNum, diceAmount);
			if (resultsArray.length) {
				// @ts-ignore
				results[diceType] = resultsArray;
			}
		});

		if (Object.keys(results).length) {
			store.dispatch(dicePoolRolled({ results }));
		}
	}
	next(action);
};
