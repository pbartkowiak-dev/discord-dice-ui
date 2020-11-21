import {
	BOOST,
	DIFFICULTY,
	ABILITY,
	CHALLENGE,
	FORCE,
	PROFICIENCY,
	SETBACK
} from '../../consts/diceConstants';

export default (diceType: string, value: number): string => {
	// handle narrative dice
	if (diceType === BOOST) {
		switch (value) {
			case 1:
			case 2:
				return 'blank';
			case 3:
				return 'success'
			case 4:
				return 'success,advantage';
			case 5:
				return 'advantage,advantage';
			case 6:
				return 'advantage';
		}
	} else if (diceType === SETBACK) {
		switch (value) {
			case 1:
			case 2:
			case 2:
				return 'blank';
			case 3:
			case 4:
				return 'failure';
			case 5:
			case 6:
				return 'threat';
		}
	} else if (diceType === DIFFICULTY) {
		switch (value) {
			case 1:
				return 'blank';
			case 2:
				return 'failure';
			case 3:
				return 'failure,failure';
			case 4:
			case 5:
			case 6:
				return 'threat';
			case 7:
				return 'threat,threat';
			case 8:
				return 'failure,threat';
		}
	} else if (diceType === ABILITY) {
		switch (value) {
			case 1:
				return 'blank';
			case 2:
			case 3:
				return 'success';
			case 4:
				return 'success,success';
			case 5:
			case 6:
				return 'advantage';
			case 7:
				return 'success,advantage';
			case 8:
				return 'advantage,advantage';
		}
	} else if (diceType === PROFICIENCY) {
		switch (value) {
			case 1:
				return 'blank';
			case 2:
			case 3:
				return 'success';
			case 4:
			case 5:
				return 'success,success';
			case 6:
				return 'advantage';
			case 7:
				return 'success,advantage';
			case 8:
			case 9:
				return 'success,advantage';
			case 10:
			case 11:
				return 'advantage,advantage';
			case 12:
				return 'triumph';
		}
	} else if (diceType === CHALLENGE) {
		switch (value) {
			case 1:
				return 'blank';
			case 2:
			case 3:
				return 'failure';
			case 4:
			case 5:
				return 'failure,failure';
			case 6:
			case 7:
				return 'threat';
			case 8:
			case 9:
				return 'failure,threat';
			case 10:
			case 11:
				return 'threat,threat';
			case 12:
				return 'despair';
		}
	} else if (diceType === FORCE) {
		switch (value) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				return 'dark';
			case 7:
				return 'dark,dark';
			case 8:
			case 9:
				return 'light';
			case 10:
			case 11:
			case 12:
				return 'light,light';
		}
	}
	return `${value}`;
};
