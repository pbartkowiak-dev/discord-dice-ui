import { requestParams } from './request';
import getSuccessLevels from './getSuccessLevels';
import getSuccessLevelString from './getSuccessLevelString';
import { SUCCESS, FAILURE, getColor } from './getColor';
import joinAsBlocks from './joinAsBlocks';

const getCocRequestMsg = (result:any, rollOptions:any, userSettings:any) => {
	const {
		results,
		cocBonusResult,
		cocPenaltyResult,
		skillLevel
	} = result;
	const username = userSettings.username || 'USERNAME_MISSING';
	const fields = [];
	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	const resultsJoined = joinAsBlocks(results, null, true);
	let finalDieResultString;
	let finalDieResult;
	let description;
	let msgTitle;

	if (rollOptions.cocBonus || rollOptions.cocTwoBonus) {
		const dieWord = rollOptions.cocBonus ? 'one Bonus Die' : 'two Bonus Dice'
		msgTitle = `${username} rolled **${dieWord}**. Results: ${resultsJoined}.`;
		finalDieResult = cocBonusResult;
	} else if (rollOptions.cocPenalty || rollOptions.cocTwoPenalty) {
		const dieWord = rollOptions.cocPenalty ? 'one Penalty Die' : 'two Penalty Dice'
		msgTitle = `${username} rolled **${dieWord}**. Results: ${resultsJoined}.`;
		finalDieResult = cocPenaltyResult;
	} else {
		msgTitle = `${username} rolled **\`1d100\`**. Result: \`${results[0]}\`.`;
		finalDieResult = results[0];
	}
	finalDieResultString = finalDieResult <= 9 ? `0${finalDieResult}` : `${finalDieResult}`;
	
	const successLevels = getSuccessLevels(skillLevel, finalDieResult);
	const successLevelIcon = successLevels.isSuccess ? ':green_circle:' : ':red_circle:';

	fields.push({
		name: successLevelIcon + ' Success level:',
		value: getSuccessLevelString(successLevels)
	});

	description = `Roll: \`${finalDieResultString}\` vs. Skill level: \`${skillLevelString}\`.`;
	if (rollOptions.isPushed) {
		description += `\nRoll **pushed**.`;
	}

	const msgParams:requestParams = {
		hookUrl: userSettings.hookUrl,
		msgTitle,
		color: successLevels.isSuccess ? getColor(SUCCESS) : getColor(FAILURE),
		fields,
		description
	};
	return msgParams;
};

export default getCocRequestMsg;