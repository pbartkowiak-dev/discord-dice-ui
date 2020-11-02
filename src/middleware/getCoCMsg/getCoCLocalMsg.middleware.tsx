import React from 'react';
import joinAsBlocks from '../../utils/joinAsBlocks';
import getSuccessLevels from '../../utils/getSuccessLevels';
import SuccessLevelLadder from '../../components/SuccessLevelLadder/SuccessLevelLadder';
import ResultVsSkillRow from '../../components/ResultVsSkillRow/ResultVsSkillRow';
import { COC_DICE_ROLLED, localMsgReady } from '../../actions/roll.actions';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === COC_DICE_ROLLED) {
		console.log('COC_DICE_ROLLED - action', action);
		const { payload: { result } } = action;
		const { payload: { rollOptions } } = action;
		const {
			results,
			cocBonusResult,
			cocPenaltyResult,
			skillLevel
		} = result;
		const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
		const fields = [];
		const resultsJoined = joinAsBlocks(results);
		let finalDieResult;
		let finalDieResultString;
		let title;
	
		if (rollOptions.cocBonus || rollOptions.cocTwoBonus) {
			const dieWord = rollOptions.cocBonus ? 'one Bonus Die' : 'two Bonus Dice';
			title = <>You rolled <strong>{dieWord}</strong>. Results: {resultsJoined}.</>;
			finalDieResult = cocBonusResult;
		} else if (rollOptions.cocPenalty || rollOptions.cocTwoPenalty) {
			const dieWord = rollOptions.cocPenalty ? 'one Penalty Die' : 'two Penalty Dice';
			title = <>You rolled <strong>{dieWord}</strong>. Results: {resultsJoined}.</>;
			finalDieResult = cocPenaltyResult;
		} else {
			title = null;
			finalDieResult = results[0];
		}
		finalDieResultString = finalDieResult <= 9 ? `0${finalDieResult}` : `${finalDieResult}`;
	
		const successLevels = getSuccessLevels(skillLevel, finalDieResult);
	
		fields.push(
			<ResultVsSkillRow
				skillLevel={skillLevelString}
				finalDieResult={finalDieResultString}
				isSuccess={successLevels.isSuccess}
			/>
		);
	
		fields.push(
			<SuccessLevelLadder successLevels={successLevels} />
		);

		store.dispatch(localMsgReady({
			title,
			fields,
			isSuccess: successLevels.isSuccess,
			finalDieResult,
			rollOptions

		}));
	}
	next(action);
};
