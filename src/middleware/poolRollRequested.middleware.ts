import { DICE_POOL_ROLL_REQUESTED, dicePoolRolled} from '../actions/roll.actions';
import getDieNumberVal from '../utils/getDieNumberVal';
import getResultsArray from '../utils/getResultsArray';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === DICE_POOL_ROLL_REQUESTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const formValues = diceModuleForm?.values || {};
		const { pool } = action.payload;
		const results = {};

		Object.keys(pool).forEach((diceType: string) => {
			const diceTypeNum = getDieNumberVal(diceType);
			const diceAmount: number = pool[diceType];
			// @ts-ignore
			results[diceType] = getResultsArray(diceTypeNum, diceAmount);
		});

		console.log('results', results);

		console.log('DICE_POOL_ROLL_REQUESTED', pool)

		store.dispatch(dicePoolRolled({ results }));

	}
	next(action);
};
