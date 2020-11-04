import { COMBAT_DIE, D20_CONAN, D20_CONAN_HL, D20_CONAN_TEST, D6_CONAN, HIT_LOCATION } from "../consts/conanConstants";
import { D20, SKILL_TEST } from "../consts/diceConstants";
import { D100_SL } from "../consts/warhammerConstants";

export default (diceType: string) => {
	if (diceType === D100_SL) {
		return SKILL_TEST;
	} else if (diceType === D6_CONAN) {
		return COMBAT_DIE;
	} else if (diceType === D20_CONAN_HL) {
		return HIT_LOCATION;
	} else if (diceType === D20_CONAN) {
		return D20;
	} else if (diceType === D20_CONAN_TEST) {
		return SKILL_TEST;
	}
	return diceType;
};
