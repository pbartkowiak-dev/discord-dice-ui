import { requestParams } from './request';

type getMsgParamsProps = {
	diceType:number,
	modifier: number,
	rollOptions: any,
	userSettings: any,
	result:Array<any>
}

const getMsgParams = ({
	diceType,
	modifier = 0,
	rollOptions,
	userSettings,
	result
}:getMsgParamsProps) => {
	const diceAmount = result.length;
	const rolledWord = diceAmount > 1 ? 'Results' : 'Result';
	const modSymbol = modifier >= 0 ? '+' : '-'
	const rolled = `${diceAmount}d${diceType}`;
	const username = userSettings.username || 'USERNAME_MISSING'
	const msgTitle = `${username} rolled \`${rolled}\`. ${rolledWord}: \`${result.join(', ')}\`.`
	const fields = [];
	let description = '';

	if (rollOptions.addModifier) {
		description = `**Modifier**: \`${modSymbol}${Math.abs(modifier)}\`.`
	}

	if (rollOptions.sumResults) {
		let name = `:arrow_right: Sum of \`${result.join('+')}\``;
		if (0 !== Number(modifier)) name += ` ${modSymbol} \`${Math.abs(modifier)}\``;
		fields.push({
			name,
			value: `Total: \`${result.reduce((a, b) => Number(a) + Number(b), Number(modifier))}\`.`
		});
	}
	if (rollOptions.keepHighest) {
		fields.push({
			name: ':arrow_up: Highest',
			value: `Highest result: \`${Math.max(...result) + Number(modifier)}\`.`
		});
	}
	if (rollOptions.keepLowest) {
		fields.push({
			name: ':arrow_down: Lowest',
			value: `Lowest result: \`${Math.min(...result) + Number(modifier)}\`.`
		});
	}
	if (rollOptions.cocBonus) {
		fields.push({
			name: ':arrow_heading_up: Bonus Die',
			value: `Bonus Die result: \`${Math.max(...result)}\`.`
		});
	}
	if (rollOptions.cocPenalty) {
		fields.push({
			name: ':arrow_heading_down: Penalty Die',
			value: `Penalty Die result: \`${Math.min(...result)}\`.`
		});
	}
	const msgParams:requestParams = {
		hookUrl: userSettings.hookUrl,
		msgTitle,
		color: userSettings.userColor,
		fields,
		description
	};
	return msgParams;
};

export default getMsgParams;