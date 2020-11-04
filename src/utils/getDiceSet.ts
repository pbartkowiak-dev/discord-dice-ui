import { classicSet, warhammerSet, conanSet, CoCSet } from '../consts/diceSets';
import { CONAN } from '../consts/conanConstants';
import { WARHAMMER } from '../consts/warhammerConstants';
import { COC } from '../consts/CoCConstants';

export type SetTypes = 'coc' | 'warhammer' | 'conan' | 'classic';

export default (setType: SetTypes) => {
	if (setType === WARHAMMER) {
		return warhammerSet;
	} else if (setType === CONAN) {
		return conanSet;
	} else if (setType === COC) {
		return CoCSet;
	}
	return classicSet;
};
