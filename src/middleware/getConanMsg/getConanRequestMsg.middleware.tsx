import { CONAN_DICE_ROLLED, requestMsgReady } from "../../actions/roll.actions";
import getConanSuccessLevel, { conanSuccessLevelType } from '../../utils/getConanSuccessLevel';
import joinAsBlocks from '../../utils/joinAsBlocks';
import { SUCCESS, FAILURE, getColor } from "../../utils/getColor";

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === CONAN_DICE_ROLLED) {
		const { payload: { result } } = action;
		const { payload: { rollOptions } } = action;
		const state = store.getState();
		const { rerollCount } = state;
		const { userSettings } = state;
		const { results } = result;
		const {
			diceAmount,
			difficulty,
			focus,
			fortune,
			tn,
			untrainedTest
		} = rollOptions;
		const username = userSettings.username || 'USERNAME_MISSING'
		const fields = [];
		const resultsJoined = joinAsBlocks(results, null, true);
		const msgTitle = `${username} rolled **\`${diceAmount}d20\`**. Results: ${resultsJoined}.`;
		let description;


		const successLevel:conanSuccessLevelType = getConanSuccessLevel(
			results,
			tn,
			focus,
			difficulty,
			untrainedTest
		);
		const successLevelIcon = successLevel.isSuccess ? ':green_circle:' : ':red_circle:';

		description = `Successes: \`${successLevel.successLevel}\` vs. Difficulty: \`${difficulty}\``;
		description += `\nFocus: \`${focus || 0}\``;
		description += `\nTN: \`${tn}\``;

		if (fortune && Number(fortune) > 0) {
			description += `\nFortune points used: \`${fortune}\``;
		}
		
		if (untrainedTest) {
			description += `\nUntrained Test`;
		}

		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';

			fields.push({
				name: `:game_die: Rerolled:`,
				value: `Rerolled \`${rerollCount}\` ${timesWord}`
			});
		}

		if (successLevel.complications) {
			fields.push({
				name: `:black_circle: Complications:`,
				value: `\`${successLevel.complications}\``
			});
		}

		fields.push({
			name: successLevelIcon + ' Roll result:',
			value: successLevel.isSuccess ? 'SUCCESS' : 'FAILURE'
		});

		fields.push({
			name: `:boom: Momentum generated:`,
			value: `\`${successLevel.momentum}\``
		});
	
		store.dispatch(requestMsgReady({
			msgTitle,
			color: successLevel.isSuccess ? getColor(SUCCESS) : getColor(FAILURE),
			fields,
			description
		}));
	}
	next(action);
};
