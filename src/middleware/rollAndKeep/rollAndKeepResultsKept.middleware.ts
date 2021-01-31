import { requestMsgReady } from '../../actions/roll.actions';
import { ROLL_AND_KEEP_RESULTS_KEPT } from '../../actions/rollAndKeep.actions';
import { getColor } from '../../utils/getColor';
import joinAsBlocks from '../../utils/joinAsBlocks';

export default (store: any) => (next: any) => (action: any) => {
	if (action.type === ROLL_AND_KEEP_RESULTS_KEPT) {
		const state = store.getState();
		const { userSettings, rerollCount } = state;
		const username = userSettings.username || 'USERNAME_MISSING';
		const { rollAndKeepData } = state;
		const { results, modifier } = rollAndKeepData;
		const { indexesKept } = action.payload;

		const resultsKept = results
			.filter((_: string, i: number) => indexesKept.includes(i));

		const total = modifier + resultsKept.flat().reduce((a: number, b: number) => (a+b), 0);

		const description = resultsKept.reduce((acc: string, resultsRow: number[]) => {
			const sum = resultsRow.reduce((a, b) => (a + b), 0);
			return acc + `${sum} (${joinAsBlocks(resultsRow, '+ ', true)})\n`
		}, '');

		const fields = [];

		if (rerollCount) {
			const rerollCountStr = rerollCount === 1 ? 'time' : 'times';
			fields.push({
				name: `:game_die: Reroll Count:`,
				value: `The dice have been rerolled \`${rerollCount}\` ${rerollCountStr}.`
			});
		}

		let totalValue = `\`${total}\``;

		if (modifier && Number(modifier)) {
			const modifierSign = Number(modifier) > 0 ? '+' : '';
			totalValue += ` (with \`${modifierSign}${modifier}\` modifier)`;
		}

		fields.push({
			name: `:arrow_right: Total result:`,
			value: totalValue
		});

		store.dispatch(requestMsgReady({
			msgTitle: `${username}'s results kept:`,
			description,
			color: getColor(),
			fields
		}));
	}
	next(action);
};
