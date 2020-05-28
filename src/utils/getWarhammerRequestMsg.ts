import { requestParams } from './request';
import getWarhammerSuccessLevels from './getWarhammerSuccessLevels';
import getWarhammerSuccessLevelString from './getWarhammerSuccessLevelString';
import getReversedResult from './getReversedResult';
import getWarhammer4eHitLocation from './getWarhammer4eHitLocation';
import getDarkHeresyIIHitLocation from './getDarkHeresyIIHitLocation';

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

	const successLevels = getWarhammerSuccessLevels(
		skillLevel,
		finalDieResult,
		!!rollOptions.fastSL,
		!!rollOptions.darkHeresySL
	);
	const successLevelIcon = successLevels.isSuccess || successLevels.isAutoSuccess ? ':green_circle:' : ':red_circle:';

	description = `Roll: \`${finalDieResultString}\` vs. Skill level: \`${skillLevelString}\`.`;

	if (rollOptions.fastSL) {
		description += '\n**Fast SL** used.';
	} else if (rollOptions.darkHeresySL) {
		description += '\n**Dark Heresy II DoS** used.';
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
		value: getWarhammerSuccessLevelString(successLevels)
	});


	let slWord = '';
	if (rollOptions.darkHeresySL) {
		if (successLevels.SL > 0) {
			slWord = successLevels.SL === 1 ? 'Degree of Success' : 'Degrees of Success';
		} else {
			slWord =  successLevels.SL === 1 ?'Degree of Failure' : 'Degrees of Failure';
		}
	} else {
		slWord = 'Success Level';
	}
	let slString = '';
	if (rollOptions.darkHeresySL) {
		slString = `${Math.abs(successLevels.SL)}`;
	} else {
		slString = successLevels.SL > 0 ? `+${successLevels.SL}` : `${successLevels.SL}`;
	}
	fields.push({
		name: `:boom: ${slWord}:`,
		value: `\`${slString}\``
	});

	const reversedResult = getReversedResult(finalDieResultString);
	const hitLocation = rollOptions.darkHeresySL 
		? getDarkHeresyIIHitLocation(reversedResult)
		: getWarhammer4eHitLocation(reversedResult);
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