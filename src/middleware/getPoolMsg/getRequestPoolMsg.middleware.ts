import { getColor } from '../../utils/getColor';
import joinAsBlocks from '../../utils/joinAsBlocks';
import getConanHitLocation from '../../utils/getConanHitLocations';
import { D6_CONAN, D20_CONAN_HL } from '../../consts/consts';
import { DICE_POOL_ROLLED, requestMsgReady } from '../../actions/roll.actions';
import { ReactElement } from 'react';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_POOL_ROLLED) {
		const state = store.getState();
		const { rerollCount } = state;
		const { userSettings } = state;
		const { results } = action.payload;
		const username = userSettings.username || 'USERNAME_MISSING';
		const fields: Array<{ name: string, value: any }> = [];
		const allResults: Array<number> = [];
		let description = '';

		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
			description += `\nRerolled \`${rerollCount}\` ${timesWord}.`;
		}
		
		Object.keys(results).forEach((diceType: string) => {

			const resultsForDiceType: Array<number> = results[diceType];
			fields.push({
				name: `:game_die: \`${resultsForDiceType.length}${diceType}\`:`,
				value: joinAsBlocks(resultsForDiceType, null, true)
			});

			resultsForDiceType.forEach((result: number) => {
				allResults.push(result);
			});

		});

		const sumJoined = joinAsBlocks(allResults, '+', true);
		let name = `:arrow_right: Sum of ${sumJoined}`;
		fields.push({
			name,
			value: `Total: \`${allResults.reduce((a, b) => a + b, 0)}\`.`
		});

	
		store.dispatch(requestMsgReady({
			msgTitle: `${username} rolled the dice. Results:`,
			color: getColor(),
			fields,
			description
		}));
	}
	next(action);
};
