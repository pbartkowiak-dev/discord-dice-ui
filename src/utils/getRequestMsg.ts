import { requestParams } from './request';
import { getColor } from './getColor';
import joinAsBlocks from './joinAsBlocks';
import getConanHitLocation from '../utils/getConanHitLocations';
import { D6_CONAN, D20_CONAN_HL } from '../consts/conanConstants';

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
	const hasMultipleDice = diceAmount > 1;
	const rolledWord = hasMultipleDice ? 'Results' : 'Result';
	const rolled = `${diceAmount}d${diceType}`;
	const username = userSettings.username || 'USERNAME_MISSING';
	const resultsJoined = joinAsBlocks(results, null, true);
	const msgTitle = `${username} rolled \`${rolled}\`. ${rolledWord}: ${resultsJoined}.`;
	const isCombatDie = rollOptions.diceTypeRaw === D6_CONAN;
	const isConanHitLocationDie = rollOptions.diceTypeRaw === D20_CONAN_HL;
	const fields = [];
	let description = '';

	if (rollOptions.useModifier) {
		description = `**Modifier**: \`${modSymbol}${Math.abs(modifier)}\`.`;
	}

	if (rollOptions.rerolledTimes) {
		const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';
		description += `\nRerolled \`${rollOptions.rerolledTimes}\` ${timesWord}.`;
	}

	if (hasMultipleDice || modifier) {
		const sumJoined = joinAsBlocks(results, '+', true);
		let name = `:arrow_right: Sum of ${sumJoined}`;
		if (Number(modifier)) name += ` ${modSymbol} \`${Math.abs(modifier)}\` (modifier)`;
		fields.push({
			name,
			value: `Total: \`${totalWithModifier}\`.`
		});
	}
	if (hasMultipleDice) {
		fields.push({
			name: ':arrow_up: Highest',
			value: `Highest result rolled: \`${highest}\`.`
		});
	}
	if (hasMultipleDice) {
		fields.push({
			name: ':arrow_down: Lowest',
			value: `Lowest result rolled: \`${lowest}\`.`
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
	if (isCombatDie) {
		fields.push({
			name: `Combat Die Results:`,
			value: `:skull: Damage: \`${dmg}\`.\n:boom: Effects: \`${effects}\`.`
		});
	}

	if (isConanHitLocationDie) {
		const hitResult = results[0];
		const hitLocation = getConanHitLocation(hitResult);

		fields.push({
			name: ':mens: Hit Location:',
			value: `\`${hitResult}\` - ${hitLocation}`
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
