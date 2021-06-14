import {
	classicSet,
	warhammerSet,
	conanSet,
	infinitySet,
	CthulhuSet,
	poolSet,
	narrativeDiceSet,
	l5rDiceSet,
	fateDiceSet,
	rollAndKeepDiceSet, wrathAndGloryDiceSet
} from '../consts/diceSets';
import { WARHAMMER, CONAN, COC, INFINITY } from '../consts/consts';
import { DiceSetType } from '../components/DiceModule/DiceTypes';
import { POOL, NARRATIVE_DICE, L5R_DICE, ROLL_AND_KEEP_DICE, WRATH_AND_GLORY_DICE } from '../consts/diceConstants';
import { FATE_DICE } from '../consts/fateConsts';

export default (setType: string): DiceSetType => {
	if (setType === WARHAMMER) {
		return warhammerSet;
	} else if (setType === CONAN) {
		return conanSet;
	} else if (setType === INFINITY) {
		return infinitySet;
	} else if (setType === COC) {
		return CthulhuSet;
	} else if (setType === POOL) {
		return poolSet;
	} else if (setType === NARRATIVE_DICE) {
		return narrativeDiceSet;
	} else if (setType === L5R_DICE) {
		return l5rDiceSet;
	} else if (setType === ROLL_AND_KEEP_DICE) {
		return rollAndKeepDiceSet;
	} else if (setType === FATE_DICE) {
		return fateDiceSet
	} else if (setType === WRATH_AND_GLORY_DICE) {
		return wrathAndGloryDiceSet
	}
	return classicSet;
};
