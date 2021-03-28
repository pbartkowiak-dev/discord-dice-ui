import { requestMsgReady } from '../../actions/roll.actions';
import { FAILURE, getColor, SUCCESS } from '../../utils/getColor';
import { CTHULHU_DICE_ROLLED } from "../../actions/cthulhu.actions";
import getSuccessLevelString from "../../utils/getSuccessLevelString";
import joinAsBlocks from "../../utils/joinAsBlocks";

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === CTHULHU_DICE_ROLLED) {
		const state = store.getState();
		const { userSettings } = state;
		const username = userSettings.username || 'USERNAME_MISSING';
		const fields = [];

		const {
			skillLevel,
			finalDieResult,
			successLevels,
			rollResults,
			cthulhuBonus,
			cthulhuTwoBonus,
			cthulhuPenalty,
			cthulhuTwoPenalty,
			isPushed
		} = action.payload;

		const {
			isSuccess,
		} = successLevels;

		const resultsJoined = joinAsBlocks(rollResults, null, true);

		let msgTitle = `${username} rolled **\`1d100\`**. Result: \`${rollResults[0]}\`.`;

		if (cthulhuBonus || cthulhuTwoBonus) {
			const dieWord = cthulhuBonus ? 'one Bonus Die' : 'two Bonus Dice'
			msgTitle = `${username} rolled **${dieWord}**. Results: ${resultsJoined}.`;
		} else if (cthulhuPenalty || cthulhuTwoPenalty) {
			const dieWord = cthulhuPenalty ? 'one Penalty Die' : 'two Penalty Dice'
			msgTitle = `${username} rolled **${dieWord}**. Results: ${resultsJoined}.`;
		}

		const successLevelIcon = isSuccess ? ':green_circle:' : ':red_circle:';

		fields.push({
			name: successLevelIcon + ' Success level:',
			value: getSuccessLevelString(successLevels)
		});

		const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
		const finalDieResultString = finalDieResult <= 9 ? `0${finalDieResult}` : `${finalDieResult}`;

		let description = `Roll: \`${finalDieResultString}\` vs. Skill level: \`${skillLevelString}\`.`;
		if (isPushed) {
			description += `\nRoll **pushed**.`;
		}

		store.dispatch(requestMsgReady({
			msgTitle,
			description,
			color: isSuccess ? getColor(SUCCESS) : getColor(FAILURE),
			fields
		}));
	}

	next(action);
};
