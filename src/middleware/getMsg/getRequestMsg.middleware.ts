import { getColor } from '../../utils/getColor';
import joinAsBlocks from '../../utils/joinAsBlocks';
import getConanHitLocation from '../../utils/getConanHitLocations';
import { D6_CONAN, D20_CONAN_HL } from '../../consts/diceConstants';
import { DICE_ROLLED, requestMsgReady } from '../../actions/roll.actions';

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_ROLLED) {
		const state = store.getState();
		const { userSettings } = state;
		const { rerollCount } = state;
		
		const { payload } = action;
		const { result, rollOptions } = payload;
		const {
			results,
			diceAmount,
			modifier,
			modSymbol,
			totalWithModifier,
			highest,
			lowest,
			cocBonus,
			cocPenalty,
			dmg,
			effects,
			diceTypeNum
		} = result;
		const hasMultipleDice = diceAmount > 1;
		const rolledWord = hasMultipleDice ? 'Results' : 'Result';
		const rolled = `${diceAmount}d${diceTypeNum}`;
		const username = userSettings.username || 'USERNAME_MISSING';
		const resultsJoined = joinAsBlocks(results, null, true);
		const msgTitle = `${username} rolled \`${rolled}\`. ${rolledWord}: ${resultsJoined}.`;
		const isCombatDie = rollOptions.diceType === D6_CONAN;
		const isConanHitLocationDie = rollOptions.diceType === D20_CONAN_HL;
		const fields = [];
		let description = '';
		
		if (rollOptions.useModifier && (!isCombatDie && !isConanHitLocationDie)) {
			description = `**Modifier**: \`${modSymbol}${Math.abs(modifier)}\`.`;
		}
	
		if (rerollCount) {
			const timesWord = rerollCount === 1 ? 'time' : 'times';
			description += `\nRerolled \`${rerollCount}\` ${timesWord}.`;
		}
	
		if ((hasMultipleDice || modifier) && (!isCombatDie && !isConanHitLocationDie)) {
			const sumJoined = joinAsBlocks(results, '+', true);
			let name = `:arrow_right: Sum of ${sumJoined}`;
			if (Number(modifier)) name += ` ${modSymbol} \`${Math.abs(modifier)}\` (modifier)`;
			fields.push({
				name,
				value: `Total: \`${totalWithModifier}\`.`
			});
		}
		if (hasMultipleDice && (!isCombatDie && !isConanHitLocationDie)) {
			fields.push({
				name: ':arrow_up: Highest',
				value: `Highest result rolled: \`${highest}\`.`
			});
		}
		if (hasMultipleDice && (!isCombatDie && !isConanHitLocationDie)) {
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
	
		store.dispatch(requestMsgReady({
			msgTitle,
			color: getColor(),
			fields,
			description
		}));
	}
	next(action);
};
