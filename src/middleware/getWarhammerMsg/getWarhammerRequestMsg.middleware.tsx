import getWarhammerSuccessLevels from '../../utils/getWarhammerSuccessLevels';
import getWarhammerSuccessLevelString from '../../utils/getWarhammerSuccessLevelString';
import getReversedResult from '../../utils/getReversedResult';
import getWarhammer2eHitLocation from '../../utils/getWarhammer2eHitLocation';
import getWarhammer4eHitLocation from '../../utils/getWarhammer4eHitLocation';
import getDarkHeresyIIHitLocation from '../../utils/getDarkHeresyIIHitLocation';
import { SUCCESS, FAILURE, getColor } from '../../utils/getColor';
import { WARHAMMER_DICE_ROLLED, requestMsgReady  } from '../../actions/roll.actions';

type fieldEmbedded = {
	name: string,
	value: string
}

export type requestParams = {
	hookUrl: string,
	msgTitle: string,
	color: number,
	fields: Array<fieldEmbedded>,
	description: string
}

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === WARHAMMER_DICE_ROLLED) {
		console.log('WARHAMMER_DICE_ROLLED - action', action);
		const state = store.getState();
		const { rerollCount } = state;
		const { userSettings } = state;
		const { payload: { result } } = action;
		const { payload: { rollOptions } } = action;
		const {
			results,
			skillLevel
		} = result;
		const username = userSettings.username || 'USERNAME_MISSING';
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
	
		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
	
			fields.push({
				name: `:game_die: Rerolled`,
				value: `Rerolled \`${rerollCount}\` ${timesWord}.`
			});
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
	
		store.dispatch(requestMsgReady({
			msgTitle,
			color: successLevels.isSuccess || successLevels.isAutoSuccess ? getColor(SUCCESS) : getColor(FAILURE),
			fields,
			description
		}));
	}
	next(action);
};
