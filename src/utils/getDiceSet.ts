import { classicSet, warhammerSet, conanSet, CoCSet } from '../consts/diceSets';
import { CONAN } from '../consts/consts';
import { WARHAMMER } from '../consts/consts';
import { COC } from '../consts/consts';
import { SetTypes, diceSet } from '../components/DiceModule/DiceTypes';

export default (setType: SetTypes): diceSet => {
	if (setType === WARHAMMER) {
		return warhammerSet;
	} else if (setType === CONAN) {
		return conanSet;
	} else if (setType === COC) {
		return CoCSet;
	}
	return classicSet;
};
