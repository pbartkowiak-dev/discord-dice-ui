import { PLUS, MINUS, BLANK, FateResult } from '../../consts/fateConsts';

export default (value: number): FateResult => {
	if (value === 1 || value === 2) {
		return PLUS;
	} else if (value === 3 || value === 4) {
		return BLANK;
	}
	return MINUS;
};
