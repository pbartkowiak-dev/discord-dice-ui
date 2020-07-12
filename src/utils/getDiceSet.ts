import { classicSet, warhammerSet, conanSet } from '../consts/diceSets';
import { CONAN } from '../consts/conanConstants';
import { WARHAMMER } from '../consts/warhammerConstants';

function getDiceSet(setType:string) {
	if (setType === WARHAMMER) {
		return warhammerSet;
	}
	if (setType === CONAN) {
		return conanSet;
	}
	return classicSet;
}

export default getDiceSet;
