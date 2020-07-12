import { requestParams } from './request';
import getWarhammerSuccessLevels from './getWarhammerSuccessLevels';
import getWarhammerSuccessLevelString from './getWarhammerSuccessLevelString';
import getReversedResult from './getReversedResult';
import getWarhammer2eHitLocation from './getWarhammer2eHitLocation';
import getWarhammer4eHitLocation from './getWarhammer4eHitLocation';
import getDarkHeresyIIHitLocation from './getDarkHeresyIIHitLocation';
import { SUCCESS, FAILURE, getColor } from './getColor';

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

	const useFastSL = rollOptions.warhammerSlMode === 'fastSL';
	const useDarkHeresySL = rollOptions.warhammerSlMode === 'darkHeresySL';
	const useWarhammer2eSL = rollOptions.warhammerSlMode === 'warhammer2eSL';

	let description;

	const successLevels = getWarhammerSuccessLevels(
		skillLevel,
		finalDieResult,
		useFastSL,
		useDarkHeresySL,
		useWarhammer2eSL
	);
	const successLevelIcon = successLevels.isSuccess || successLevels.isAutoSuccess ? ':green_circle:' : ':red_circle:';

	description = `Roll: \`${finalDieResultString}\` vs. Skill level: \`${skillLevelString}\`.`;

	if (useFastSL) {
		description += '\n**Fast SL** used.';
	} else if (useDarkHeresySL) {
		description += '\n**Dark Heresy II DoS** used.';
	} else if (useWarhammer2eSL) {
		description += '\n**Warhammer 2e DoS** used.';
	} else {
		description += '\n**Default Warhammer 4e SL** used.';
	}

	if (successLevels.isDouble) {
		description += '\nRolled **Double**.';
	}

	if (rollOptions.rerolledTimes) {
		const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
		description += `\nRerolled \`${rollOptions.rerolledTimes}\` ${timesWord}.`;
	}

	fields.push({
		name: successLevelIcon + ' Roll result:',
		value: getWarhammerSuccessLevelString(successLevels)
	});


	let slWord = '';
	if (useDarkHeresySL || useWarhammer2eSL) {
		if (successLevels.isSuccess || successLevels.isAutoSuccess) {
			slWord = 'Degrees of Success';
		} else {
			slWord = 'Degrees of Failure';
		}
	} else {
		slWord = 'Success Level';
	}
	let slString = '';
	if (useDarkHeresySL || useWarhammer2eSL) {
		slString = `${Math.abs(successLevels.SL)}`;
	} else {
		slString = successLevels.SL > 0 ? `+${successLevels.SL}` : `${successLevels.SL}`;
	}
	fields.push({
		name: `:boom: ${slWord}:`,
		value: `\`${slString}\``
	});

	const reversedResult = getReversedResult(finalDieResultString);
	let hitLocation;

	if (useDarkHeresySL) {
		hitLocation = getDarkHeresyIIHitLocation(reversedResult)
	} else if (useWarhammer2eSL) {
		hitLocation = getWarhammer2eHitLocation(reversedResult);
	} else {
		hitLocation = getWarhammer4eHitLocation(reversedResult);
	}

	fields.push({
		name: ':mens: Hit Location:',
		value: `\`${reversedResult}\` - ${hitLocation}`
	});

	const msgParams:requestParams = {
		hookUrl: userSettings.hookUrl,
		msgTitle,
		color: successLevels.isSuccess || successLevels.isAutoSuccess ? getColor(SUCCESS) : getColor(FAILURE),
		fields,
		description
	};
	return msgParams;
};

export default getRequestMsg;