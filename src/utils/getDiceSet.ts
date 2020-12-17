import {
	classicSet,
	warhammerSet,
	conanSet,
	CoCSet,
	poolSet,
	narrativeDiceSet,
	l5rDiceSet
} from '../consts/diceSets';
import { WARHAMMER, CONAN, COC } from '../consts/consts';
import { DiceSetType } from '../components/DiceModule/DiceTypes';
import { POOL, NARRATIVE_DICE, L5R_DICE } from '../consts/diceConstants';

export default (setType: string): DiceSetType => {
	if (setType === WARHAMMER) {
		return warhammerSet;
	} else if (setType === CONAN) {
		return conanSet;
	} else if (setType === COC) {
		return CoCSet;
	} else if (setType === POOL) {
		return poolSet;
	} else if (setType === NARRATIVE_DICE) {
		return narrativeDiceSet;
	} else if (setType === L5R_DICE) {
		return l5rDiceSet;
	}
	return classicSet;
};
