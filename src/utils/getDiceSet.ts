import { classicSet, warhammerSet, conanSet } from '../consts/diceSets';

function getDiceSet(setType:string) {
	if (setType === 'warhammer') {
		return warhammerSet;
	}
	if (setType === 'conan') {
		return conanSet;
	}
	return classicSet;
}

export default getDiceSet;
