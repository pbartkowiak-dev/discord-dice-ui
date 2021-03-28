import { CTHULHU_ROLL_REQESTED, cthulhuDiceRolled } from "../../actions/cthulhu.actions";
import getResultsArray from '../../utils/getResultsArray';
import getSuccessLevels from "../../utils/getSuccessLevels";

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === CTHULHU_ROLL_REQESTED) {
		const {
			skillLevel,
			cocBonus,
			cocTwoBonus,
			cocPenalty,
			cocTwoPenalty
		} = action.payload;

		let diceAmount = 1;
		let finalDieResult;

		if (cocBonus || cocPenalty) {
			diceAmount = 2;
		} else if (cocTwoBonus || cocTwoPenalty) {
			diceAmount = 3;
		}

		const keepUnits = (cocBonus || cocTwoBonus || cocPenalty || cocTwoPenalty);
		const rollResults = getResultsArray(100, diceAmount, keepUnits);

		const cocBonusResult = (cocBonus || cocTwoBonus) ? Math.min(...results) : undefined;
		const cocPenaltyResult = (cocPenalty || cocTwoPenalty) ?  Math.max(...results) : undefined;

		if (cocBonus || cocTwoBonus) {
			finalDieResult = cocBonusResult;
		} else if (cocPenalty || cocTwoPenalty) {
			finalDieResult = cocPenaltyResult;
		} else {
			finalDieResult = results[0];
		}

		const successLevels = getSuccessLevels(skillLevel, finalDieResult || 0);

		store.dispatch(cthulhuDiceRolled({
			...action.payload,
			finalDieResult,
			successLevels,
			rollResults,
			cocBonusResult,
			cocPenaltyResult
		}));
	}

	next(action);
};
