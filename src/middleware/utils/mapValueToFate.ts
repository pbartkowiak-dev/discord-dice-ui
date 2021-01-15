import { PLUS, MINUS, BLANK } from '../../consts/fateConsts';

export default (value: number): string => {
	switch (value) {
		case 1:
		case 2:
			return PLUS;
		case 3:
		case 4:
			return BLANK;
		case 5:
		case 6:
			return MINUS;
	}
	return `${value}`;
};
