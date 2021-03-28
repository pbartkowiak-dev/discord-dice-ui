import { WARHAMMER_DICE_ROLLED } from "../../actions/warhammer.actions";
import { requestMsgReady } from '../../actions/roll.actions';
import { FAILURE, getColor, SUCCESS } from '../../utils/getColor';
import getWarhammerSuccessLevelString from "../../utils/getWarhammerSuccessLevelString";

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === WARHAMMER_DICE_ROLLED) {
		const state = store.getState();
		const { warhammerState, rerollCount, userSettings } = state;
		const username = userSettings.username || 'USERNAME_MISSING';
		const { slType } = warhammerState;
		const {
			result,
			resultReversed,
			successLevels,
			skillLevel,
			hitLocation
		} = action.payload;

		const {
			SL,
			isSuccess,
			isAutoSuccess,
			isDouble
		} = successLevels;

		const useFastSL = slType === 'fastSL';
		const useDarkHeresySL = slType === 'darkHeresySL';
		const useWarhammer2eSL = slType === 'warhammer2eSL';

		const msgTitle = `${username} rolled **\`1d100\`**. Result: \`${result}\`.`;
		const fields = [];

		const successLevelIcon = isSuccess || isAutoSuccess ? ':green_circle:' : ':red_circle:';
		const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
		const resultString = result <= 9 ? `0${result}` : `${result}`;

		let description = `Roll: \`${resultString}\` vs. Skill level: \`${skillLevelString}\`.`;

		if (useFastSL) {
			description += '\n**Fast SL** used.';
		} else if (useDarkHeresySL) {
			description += '\n**Dark Heresy II DoS** used.';
		} else if (useWarhammer2eSL) {
			description += '\n**Warhammer 2e DoS** used.';
		} else {
			description += '\n**Default Warhammer 4e SL** used.';
		}

		if (isDouble) {
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

		let slWord = 'Success Level';
		let slString = SL > 0 ? `+${SL}` : `${SL}`;

		if (useDarkHeresySL || useWarhammer2eSL) {
			slString = `${Math.abs(SL)}`;
			if (isSuccess || isAutoSuccess) {
				slWord = 'Degrees of Success';
			} else {
				slWord = 'Degrees of Failure';
			}
		}

		fields.push({
			name: `:boom: ${slWord}:`,
			value: `\`${slString}\``
		});

		fields.push({
			name: ':mens: Hit Location:',
			value: `\`${resultReversed}\` - ${hitLocation}`
		});

		store.dispatch(requestMsgReady({
			msgTitle,
			description,
			color: isSuccess || isAutoSuccess ? getColor(SUCCESS) : getColor(FAILURE),
			fields
		}));
	}
	next(action);
};
