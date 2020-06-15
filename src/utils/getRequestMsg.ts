import { requestParams } from './request';
import { getColor } from './getColor';

const getRequestMsg = (result:any, rollOptions:any, userSettings:any) => {
	const {
		results,
		diceAmount,
		diceType,
		modifier,
		modSymbol,
		totalWithModifier,
		highest,
		lowest,
		cocBonus,
		cocPenalty
	} = result;
	const rolledWord = diceAmount > 1 ? 'Results' : 'Result';
	const rolled = `${diceAmount}d${diceType}`;
	const username = userSettings.username || 'USERNAME_MISSING'
	const msgTitle = `${username} rolled \`${rolled}\`. ${rolledWord}: \`${results.join(', ')}\`.`
	const fields = [];
	let description = '';

	if (rollOptions.useModifier) {
		description = `**Modifier**: \`${modSymbol}${Math.abs(modifier)}\`.`
	}

	if (rollOptions.sumResults) {
		let name = `:arrow_right: Sum of \`${results.join('+')}\``;
		if (0 !== Number(modifier)) name += ` ${modSymbol} \`${Math.abs(modifier)}\` (modifier)`;
		fields.push({
			name,
			value: `Total: \`${totalWithModifier}\`.`
		});
	}
	if (rollOptions.keepHighest) {
		fields.push({
			name: ':arrow_up: Highest',
			value: `Highest result: \`${highest}\`.`
		});
	}
	if (rollOptions.keepLowest) {
		fields.push({
			name: ':arrow_down: Lowest',
			value: `Lowest result: \`${lowest}\`.`
		});
	}
	if (rollOptions.cocBonus) {
		fields.push({
			name: ':arrow_heading_up: Bonus Die',
			value: `Bonus Die result: \`${cocBonus}\`.`
		});
	}
	if (rollOptions.cocPenalty) {
		fields.push({
			name: ':arrow_heading_down: Penalty Die',
			value: `Penalty Die result: \`${cocPenalty}\`.`
		});
	}
	const msgParams:requestParams = {
		hookUrl: userSettings.hookUrl,
		msgTitle,
		color: getColor(),
		fields,
		description
	};
	return msgParams;
};

export default getRequestMsg;