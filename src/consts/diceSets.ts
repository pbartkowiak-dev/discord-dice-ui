import {
	D6_CONAN,
	D20_CONAN_TEST,
	D20_CONAN,
	D20_CONAN_HL,
	D6_INFINITY,
	D20_INFINITY_TEST,
	D20_INFINITY,
	D20_INFINITY_HL,
	D100_SL,
	D100,
	D20,
	D12,
	D10,
	D8,
	D6,
	D4,
	POOL,
	MODIFIER,
	BOOST,
	DIFFICULTY,
	ABILITY,
	CHALLENGE,
	FORCE,
	PROFICIENCY,
	SETBACK,
	RING_DIE,
	SKILL_DIE,
	CONAN_TOKENS,
	INFINITY_TOKENS,
	NARRATIVE_TOKENS,
	WARHAMMER_MONEY,
	CTHULHU_SHEET_MODAL
} from './diceConstants';

import { FATE_DIE } from './fateConsts';

import narrativeDice from './narrativeDice';
import l5rDice from './l5rDice';

/*******************************************
 *
 * image file name
 * ================
 *
 * die image has to be named {diceType}.png 
 * or described in `diceImg` property
 *
 ***************************************** */

export const classicSet = [{
	diceType: D100,
	label: 'd100'
}, {
	diceType: D20,
	label: 'd20'
}, {
	diceType: D12,
	label: 'd12'
}, {
	diceType: D10,
	label: 'd10'
}, {
	diceType: D8,
	label: 'd8'
}, {
	diceType: D6,
	label: 'd6'
}, {
	diceType: D4,
	label: 'd4'
}, {
	diceType: POOL,
	label: 'Pool Builder',
	noDropdown: true
}];

export const poolSet = [{
	diceType: D100,
	label: 'd100'
}, {
	diceType: D20,
	label: 'd20'
}, {
	diceType: D12,
	label: 'd12'
}, {
	diceType: D10,
	label: 'd10'
}, {
	diceType: D8,
	label: 'd8'
}, {
	diceType: D6,
	label: 'd6'
}, {
	diceType: D4,
	label: 'd4'
}, {
	diceType: MODIFIER,
	label: 'Apply Modifier'
}];

export const CthulhuSet = [{
	diceType: D100_SL,
	diceImg: 'd100.png',
	label: 'Skill test',
	noDropdown: true
}, {
	diceType: D100,
	label: 'd100'
}, {
	diceType: D20,
	label: 'd20'
}, {
	diceType: D12,
	label: 'd12'
}, {
	diceType: D10,
	label: 'd10'
}, {
	diceType: D8,
	label: 'd8'
}, {
	diceType: D6,
	label: 'd6'
}, {
	diceType: D4,
	label: 'd4'
},  {
	diceType: CTHULHU_SHEET_MODAL,
	diceImg: 'sheet-icon.png',
	label: 'Character Sheet',
	noDropdown: true
}];

export const warhammerSet = [{
	diceType: D100_SL,
	diceImg: 'd100.png',
	label: 'Skill test',
	noDropdown: true

}, {
	diceType: D100,
	label: 'd100'
}, {
	diceType: D10,
	label: 'd10'
}, {
	diceType: WARHAMMER_MONEY,
	label: 'Money converter',
	diceImg: 'warhammer_money/gold.png',
	noDropdown: true
}];

export const conanSet = [{
	diceType: D20_CONAN_TEST,
	label: 'Skill Test',
	noDropdown: true
}, {
	diceType: D20_CONAN,
	label: 'd20'
}, {
	diceType: D20_CONAN_HL,
	label: 'Hit Location',
	noDropdown: true
}, {
	diceType: D6_CONAN,
	label: 'Combat Die'
}, {
	diceType: CONAN_TOKENS,
	label: 'Update pools',
	diceImg: 'conan_tokens.png',
	noDropdown: true
}];

export const infinitySet = [{
	diceType: D20_INFINITY_TEST,
	label: 'Skill Test',
	noDropdown: true
}, {
	diceType: D20_INFINITY,
	label: 'd20'
}, {
	diceType: D20_INFINITY_HL,
	label: 'Hit Location',
	noDropdown: true
}, {
	diceType: D6_INFINITY,
	label: 'Combat Die'
}, {
	diceType: INFINITY_TOKENS,
	label: 'Update pools',
	diceImg: 'infinity_tokens.png',
	noDropdown: true
}];

export const narrativeDiceSet = [
	narrativeDice[BOOST],
	narrativeDice[ABILITY],
	narrativeDice[PROFICIENCY],
	narrativeDice[SETBACK],
	narrativeDice[DIFFICULTY],
	narrativeDice[CHALLENGE],
	narrativeDice[FORCE],
	narrativeDice[D100], {
		diceType: NARRATIVE_TOKENS,
		label: 'Update pools',
		diceImg: 'narrative_tokens.png',
		isExcludedFromPool: true,
		noDropdown: true
	}
];

export const l5rDiceSet = [
	l5rDice[RING_DIE],
	l5rDice[SKILL_DIE], {
		diceType: D10,
		label: 'd10',
		isExcludedFromPool: true,
		noDropdown: true
	}
];

export const rollAndKeepDiceSet = [{
	diceType: D10,
	label: 'Roll and Keep',
	noDropdown: true
}, {
	diceType: MODIFIER,
	label: 'Apply Modifier'
}];

export const fateDiceSet = [{
	diceType: FATE_DIE,
	label: 'Fate Dice'
}];
