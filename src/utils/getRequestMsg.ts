import { requestParams } from './request';
import { getColor } from './getColor';
import joinAsBlocks from './joinAsBlocks';

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
		cocPenalty,
		dmg,
		effects
	} = result;
	const rolledWord = diceAmount > 1 ? 'Results' : 'Result';
	const rolled = `${diceAmount}d${diceType}`;
	const username = userSettings.username || 'USERNAME_MISSING';
	const resultsJoined = joinAsBlocks(results, null, true);
	const msgTitle = `${username} rolled \`${rolled}\`. ${rolledWord}: ${resultsJoined}.`
	const fields = [];
	let description = '';

	if (rollOptions.useModifier) {
		description = `**Modifier**: \`${modSymbol}${Math.abs(modifier)}\`.`
	}

	if (rollOptions.sumResults) {
		const sumJoined = joinAsBlocks(results, '+', true);
		let name = `:arrow_right: Sum of ${sumJoined}`;
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
	if (rollOptions.combatDie) {
		fields.push({
			name: `Combat Die Results:`,
			value: `:skull: Damage: \`${dmg}\`.\n:boom: Effects: \`${effects}\`.`
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
