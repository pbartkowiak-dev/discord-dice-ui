import React from 'react';
import CodeSpan from '../components/CodeSpan/CodeSpan';
import getSuccessLevels from './getSuccessLevels';
import SuccessLevelLadder from '../components/SuccessLevelLadder/SuccessLevelLadder';
import ResultVsSkillRow from '../components/ResultVsSkillRow/ResultVsSkillRow';

export type LocalMsgParamsType = {
	title: any,
	fields: Array<any>
	isSuccess?: boolean
	canPushRoll?: boolean
	rollOptions?: any
	finalDieResult?: number
}

const getCocLocalMsg = (result:any, rollOptions:any):LocalMsgParamsType => {
	const {
		results,
		cocBonusResult,
		cocPenaltyResult,
		skillLevel
	} = result;
	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	const fields = [];
	let finalDieResult;
	let finalDieResultString;
	let title;

	if (rollOptions.cocBonus || rollOptions.cocTwoBonus) {
		const dieWord = rollOptions.cocBonus ? 'one Bonus Die' : 'two Bonus Dice'
		title = <>You rolled <strong>{dieWord}</strong>. Results: <CodeSpan>{results.join(', ')}</CodeSpan>.</>;
		finalDieResult = cocBonusResult;
	} else if (rollOptions.cocPenalty || rollOptions.cocTwoPenalty) {
		const dieWord = rollOptions.cocPenalty ? 'one Penalty Die' : 'two Penalty Dice'
		title = <>You rolled <strong>{dieWord}</strong>. Results: <CodeSpan>{results.join(', ')}</CodeSpan>.</>;
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

	return {
		title,
		fields,
		isSuccess: successLevels.isSuccess,

		canPushRoll: true,

		finalDieResult,
		rollOptions
	};
};

export default getCocLocalMsg;