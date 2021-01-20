import { L5R_ROLL_ADDITIONAL_DIE } from '../../actions/l5r.actions';
import { ADDITIONAL_DIE, ROLLED_DIE } from '../../consts/consts';
import { RING_DIE, SKILL_DIE } from '../../consts/diceConstants';
import getDieNumberVal from '../../utils/getDieNumberVal';
import getResultsArray from '../../utils/getResultsArray';
import mapValueToL5r from '../utils/mapValueToL5r';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === L5R_ROLL_ADDITIONAL_DIE) {
		const state = store.getState();
		const { l5rData } = state;
		const {
			additionalDiceRolled,
			resultsKeptIndexesExploded,
			additionalDiceIndexesExploded
		} = l5rData;
		const { index, result, type } = action.payload;

		const diceType = result.includes(RING_DIE) ? RING_DIE : SKILL_DIE;
		const diceTypeNum = getDieNumberVal(diceType);
		const numValue = getResultsArray(diceTypeNum, 1)[0];
		const newResult = mapValueToL5r(diceType, numValue);

		const additionalDiceRolledClone = [...additionalDiceRolled];
		const resultsKeptIndexesExplodedClone = [...resultsKeptIndexesExploded];
		const additionalDiceIndexesExplodedClone = [...additionalDiceIndexesExploded];

		additionalDiceRolledClone.push(newResult);

		if (type === ROLLED_DIE) {
			resultsKeptIndexesExplodedClone.push(index);
		} else if (type === ADDITIONAL_DIE) {
			additionalDiceIndexesExplodedClone.push(index);

		}

		action.payload = {
			additionalDiceRolled: additionalDiceRolledClone,
			resultsKeptIndexesExploded: resultsKeptIndexesExplodedClone,
			additionalDiceIndexesExploded: additionalDiceIndexesExplodedClone
		};
	}
	next(action);
};
