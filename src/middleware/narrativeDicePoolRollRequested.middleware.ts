import { NARRATIVE_DICE_POOL_ROLL_REQUESTED, narrativeDicePoolRolled } from '../actions/roll.actions';
import getDieNumberVal from '../utils/getDieNumberVal';
import getResultsArray from '../utils/getResultsArray';
import mapValueToNarrative from './utils/mapValueToNarrative';
import getNarrativeDiceDerivedResults from './utils/getNarrativeDiceDerivedResults';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === NARRATIVE_DICE_POOL_ROLL_REQUESTED) {
		const state = store.getState();
		const { form : { diceModuleForm } } = state;
		const formValues = diceModuleForm?.values || {};
		const { pool, modifier } = action.payload;
		const allResults: Array<string> = [];
		const results = {};
		let resultsDerived;

		console.log('pool', pool)

		Object.keys(pool).forEach((diceType: string) => {
			const diceTypeNum = getDieNumberVal(diceType);
			const diceAmount: number = pool[diceType];
			const resultsArray = getResultsArray(diceTypeNum, diceAmount);
			if (resultsArray.length) {
				const mappedResults = resultsArray.map((value: number) => {
					return mapValueToNarrative(diceType, value);
				});

				// @ts-ignore
				results[diceType] = mappedResults;

				mappedResults.forEach((rs: string) => {
					// Fill allResults
					rs.split(',').forEach((r: string) => {
						allResults.push(r);
					});
				});
			}
		});

		resultsDerived = getNarrativeDiceDerivedResults(allResults);
		console.log('results', results);
		console.log('resultsDerived', resultsDerived);

		if (Object.keys(results).length) {
			store.dispatch(narrativeDicePoolRolled({
				results,
				resultsDerived
			}));
		}
	}
	next(action);
};
