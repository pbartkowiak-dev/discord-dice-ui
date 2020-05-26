import { classicSet, warhammer4eSet } from '../consts/diceSets';

function getDiceSet(setType:string) {
	if (setType === 'warhammer4e') {
		return warhammer4eSet;
	}
	return classicSet;
}

export default getDiceSet;
