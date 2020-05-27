import { requestParams } from './request';
import getWarhammer4eSuccessLevels from './getWarhammer4eSuccessLevels';
import getWarhammer4eSuccessLevelString from './getWarhammer4eSuccessLevelString';
import getReversedResult from './getReversedResult';
import getWarhammer4eHitLocation from './getWarhammer4eHitLocation';

const getRequestMsg = (result:any, rollOptions:any, userSettings:any) => {
	const {
		results,
		skillLevel
	} = result;
	const username = userSettings.username || 'USERNAME_MISSING'
	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	const fields = [];
	const finalDieResult = results[0];
	const finalDieResultString = finalDieResult <= 9 ? `0${finalDieResult}` : `${finalDieResult}`;
	const msgTitle = `${username} rolled **\`1d100\`**. Result: \`${results[0]}\`.`;
	let description;

	const successLevels = getWarhammer4eSuccessLevels(
		skillLevel,
		finalDieResult,
		!!rollOptions.fastSL
	);
	const slString = successLevels.SL > 0 ? `+${successLevels.SL}` : `${successLevels.SL}`;
	const successLevelIcon = successLevels.isSuccess || successLevels.isAutoSuccess ? ':green_circle:' : ':red_circle:';

	description = `Roll: \`${finalDieResultString}\` vs. Skill level: \`${skillLevelString}\`.`;

	if (rollOptions.fastSL) {
		description += '\n**Fast SL** used.';
	}

	if (successLevels.isDouble) {
		description += '\nRolled **Double**.';
	}
	if (rollOptions.rerolledTimes) {
		const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
		description += `\nRerolled \`${rollOptions.rerolledTimes}\` ${timesWord}.`
	}

	fields.push({
		name: successLevelIcon + ' Roll result:',
		value: getWarhammer4eSuccessLevelString(successLevels)
	});

	fields.push({
		name: ':boom: Success Level:',
		value: `\`${slString}\``
	});

	const reversedResult = getReversedResult(finalDieResultString);
	const hitLocation = getWarhammer4eHitLocation(reversedResult);
	fields.push({
		name: ':mens: Hit Location:',
		value: `\`${reversedResult}\` - ${hitLocation}`
	});

	const msgParams:requestParams = {
		hookUrl: userSettings.hookUrl,
		msgTitle,
		color: userSettings.userColor,
		fields,
		description
	};
	return msgParams;
};

export default getRequestMsg;