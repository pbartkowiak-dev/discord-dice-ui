import React from 'react';
import CodeSpan from '../components/CodeSpan/CodeSpan';
import getSuccessLevels from './getSuccessLevels';
import SuccessLevelLadder from '../components/SuccessLevelLadder/SuccessLevelLadder';
import ResultVsSkillRow from '../components/ResultVsSkillRow/ResultVsSkillRow';

const getLocalCoCMsg = (result:any, rollOptions:any) => {
	const {
		results,
		cocBonusResult,
		cocPenaltyResult,
		skillLevel
	} = result;
	const fields = [];
	let finalDieResult;
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

	const successLevels = getSuccessLevels(skillLevel, finalDieResult);


	fields.push(
		<ResultVsSkillRow
			skillLevel={skillLevel}
			finalDieResult={finalDieResult}
			isSuccess={successLevels.isSuccess}
		/>
	);


	fields.push(
		<SuccessLevelLadder successLevels={successLevels} />
	);

	return {
		title,
		fields
	};
};

export default getLocalCoCMsg;