import { CONAN_DICE_ROLLED, requestMsgReady } from "../../actions/roll.actions";
import { getColor } from "../../utils/getColor";

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === CONAN_DICE_ROLLED) {
		console.log('CONAN_DICE_ROLLED - action', action);
	// 	const { payload: { result } } = action;
	// 	const { payload: { rollOptions } } = action;
	// 	const {
	// 		results,
	// 		cocBonusResult,
	// 		cocPenaltyResult,
	// 		skillLevel
	// 	} = result;

	// 	const state = store.getState();
	// 	const { userSettings } = state;
	// 	const username = userSettings.username || 'USERNAME_MISSING';
	// 	const fields = [];
	// 	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	// 	const resultsJoined = joinAsBlocks(results, null, true);
	// 	let finalDieResultString;
	// 	let finalDieResult;
	// 	let description;
	// 	let msgTitle;
	
	// 	if (rollOptions.cocBonus || rollOptions.cocTwoBonus) {
	// 		const dieWord = rollOptions.cocBonus ? 'one Bonus Die' : 'two Bonus Dice'
	// 		msgTitle = `${username} rolled **${dieWord}**. Results: ${resultsJoined}.`;
	// 		finalDieResult = cocBonusResult;
	// 	} else if (rollOptions.cocPenalty || rollOptions.cocTwoPenalty) {
	// 		const dieWord = rollOptions.cocPenalty ? 'one Penalty Die' : 'two Penalty Dice'
	// 		msgTitle = `${username} rolled **${dieWord}**. Results: ${resultsJoined}.`;
	// 		finalDieResult = cocPenaltyResult;
	// 	} else {
	// 		msgTitle = `${username} rolled **\`1d100\`**. Result: \`${results[0]}\`.`;
	// 		finalDieResult = results[0];
	// 	}
	// 	finalDieResultString = finalDieResult <= 9 ? `0${finalDieResult}` : `${finalDieResult}`;
		
	// 	const successLevels = getSuccessLevels(skillLevel, finalDieResult);
	// 	const successLevelIcon = successLevels.isSuccess ? ':green_circle:' : ':red_circle:';
	
	// 	fields.push({
	// 		name: successLevelIcon + ' Success level:',
	// 		value: getSuccessLevelString(successLevels)
	// 	});
	
	// 	description = `Roll: \`${finalDieResultString}\` vs. Skill level: \`${skillLevelString}\`.`;
	// 	if (rollOptions.isPushed) {
	// 		description += `\nRoll **pushed**.`;
	// 	}
	
	// 	store.dispatch(requestMsgReady({
	// 		hookUrl: userSettings.hookUrl,
	// 		msgTitle,
	// 		color: successLevels.isSuccess ? getColor(SUCCESS) : getColor(FAILURE),
	// 		fields,
	// 		description
	// 	}));
	}
	next(action);
};
