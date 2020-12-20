import { getColor } from '../../utils/getColor';
import joinAsBlocks from '../../utils/joinAsBlocks';
import { NARRATIVE_DICE_POOL_ROLLED, requestMsgReady } from '../../actions/roll.actions';
import { ResultsDerivedType } from '../../components/PoolBuilder/PoolBuilderTypes';
import narrativeSymbols from '../../consts/narrativeSymbols';
import narrativeDice from '../../consts/narrativeDice';
import narrativeDiceSorter from '../utils/narrativeDiceSorter';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === NARRATIVE_DICE_POOL_ROLLED) {
		const state = store.getState();
		const { rerollCount } = state;
		const { userSettings } = state;
		const { results, resultsDerived } = action.payload;
		const username = userSettings.username || 'USERNAME_MISSING';
		const fields: Array<{ name: string, value: any }> = [];
		const diceRolled: Array<string> = [];
		let description = '';

		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
			description += `\nRerolled \`${rerollCount}\` ${timesWord}.`;
		}

		Object.keys(results)
			.sort(narrativeDiceSorter)
			.forEach((diceType: string) => {
				const diceAmount: Array<string> = results[diceType].length;
				// @ts-ignore
				const diceLabel: string = narrativeDice[diceType]?.label;
				diceRolled.push(`${diceAmount}x ${diceLabel}`);
			});

		fields.push({
			name: `:game_die: Dice rolled:`,
			value: `${joinAsBlocks(diceRolled, '', true)}.`
		});

		Object.entries(resultsDerived as ResultsDerivedType)
			.filter((resultsTuple: [string, number]) => {
				// return non-zero results;
				return resultsTuple[1];
			})
			.forEach((resultsTuple: [string, number]) => {
				const symbolType = resultsTuple[0];
				const symbolCount = resultsTuple[1];
				// @ts-ignore
				const symbolLabel = narrativeSymbols[symbolType]?.label;

				fields.push({
					name: `:arrow_right: \`${symbolLabel}\`:`,
					value: `\`${symbolCount}\``
				});
			});
	
		store.dispatch(requestMsgReady({
			msgTitle: `${username} rolled the dice. Results Summary:`,
			color: getColor(),
			description,
			fields
		}));
	}
	next(action);
};
