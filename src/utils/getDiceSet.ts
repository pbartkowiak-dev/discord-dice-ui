import { classicSet, warhammerSet, conanSet, CoCSet, poolSet, narrativeDiceSet} from '../consts/diceSets';
import { WARHAMMER, CONAN, COC } from '../consts/consts';
import { DiceSetType } from '../components/DiceModule/DiceTypes';
import { POOL, NARRATIVE_DICE } from '../consts/diceConstants';

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
	}
	return classicSet;
};
