import rollDice from './rollDice';
import { requestParams } from './request';

type getMsgParamsProps = {
	diceType:number,
	diceAmount: number,
	modifier: number,
	rollOptions: any,
	userSettings: any
}

const getMsgParams = ({
	diceType,
	diceAmount = 1,
	modifier = 0,
	rollOptions,
	userSettings
}:getMsgParamsProps) => {
	const keepUnits = true;
	const result = rollDice(diceType, diceAmount, keepUnits);
	const resultsWord = diceAmount > 1 ? 'Results' : 'Result';
	const modSymbol = modifier >= 0 ? '+' : ''
	const rolled = `${diceAmount}d${diceType}${modifier ? `${modSymbol}` + modifier : '' }`;
	const username = userSettings.username || 'USERNAME_MISSING'
	const msgTitle = `${username} rolled \`${rolled}\`. ${resultsWord}: \`${result.join(', ')}\`.`
	const fields = [];

	if (rollOptions.sumResults) {
		fields.push({
			name: ':arrow_right: Sum',
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
		fields
	};
	return msgParams;
};

export default getMsgParams;