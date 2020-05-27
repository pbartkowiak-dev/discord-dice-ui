import { classicSet, warhammerSet } from '../consts/diceSets';

function getDiceSet(setType:string) {
	if (setType === 'warhammer') {
		return warhammerSet;
	}
	return classicSet;
}

export default getDiceSet;
