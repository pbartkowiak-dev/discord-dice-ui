import { classicSet, warhammerSet, conanSet, CoCSet, poolSet } from '../consts/diceSets';
import { WARHAMMER, CONAN, COC } from '../consts/consts';
import { SetTypes, diceSet } from '../components/DiceModule/DiceTypes';
import { POOL } from '../consts/diceConstants';

export default (setType: SetTypes): diceSet => {
	if (setType === WARHAMMER) {
		return warhammerSet;
	} else if (setType === CONAN) {
		return conanSet;
	} else if (setType === COC) {
		return CoCSet;
	} else if (setType === POOL) {
		return poolSet;
	}
	return classicSet;
};
