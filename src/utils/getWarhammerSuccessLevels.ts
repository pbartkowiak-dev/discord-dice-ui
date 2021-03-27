export interface successLevelsType {
	isSuccess: boolean;
	isFailure: boolean;
	isAutoFailure: boolean;
	isAutoSuccess: boolean;
	isDouble: boolean;
	SL: number;
}

const getTens = (num:number) => Math.floor(num / 10);

export default ({
	skillLevel,
	result,
	useFastSL,
	useDarkHeresySL,
	useWarhammer2eSL,
}: any): successLevelsType => {
	let autoFailureMin;
	let autoFailureMax;
	let autoSuccessMin; 
	let autoSuccessMax; 

	if (useDarkHeresySL) {
		autoFailureMin = 100;
		autoFailureMax = 100;
		autoSuccessMin = 1;
		autoSuccessMax = 1;
	} else {
		autoFailureMin = 96;
		autoFailureMax = 100;
		autoSuccessMin = 1;
		autoSuccessMax = 5;
	}

	const isAutoFailure = !useWarhammer2eSL && (result >= autoFailureMin && result <= autoFailureMax);
	const isAutoSuccess = !useWarhammer2eSL && (result >= autoSuccessMin && result <= autoSuccessMax);

	const isSuccess = (!isAutoFailure && (result <= skillLevel)) || isAutoSuccess;
	const isFailure = (!isAutoSuccess && !isSuccess) || isAutoFailure;

	const isDouble = result % 11 === 0;

	let SL;

	if (useFastSL && isSuccess) {
		SL = getTens(result);
	} else {
		const rolledTens = getTens(result);
		const skillTens = getTens(skillLevel);
		SL = skillTens - rolledTens;

		if (isAutoSuccess) {
			SL = SL > 1 ? SL : 1;
		} else if (isAutoFailure) {
			SL = SL < -1 ? SL : -1;
		}
	}

	if (!useFastSL && useDarkHeresySL) {
		if (isSuccess || isAutoSuccess) {
			SL = SL + 1;
		} else if (isFailure || isAutoFailure) {
			SL = SL -1;
		}
	}

	if (useWarhammer2eSL) {
		if (isSuccess) {
			SL = Math.floor((skillLevel - result) / 10);
		} else if (isFailure) {
			SL = (Math.floor((result - skillLevel) / 10));
			if (SL !== 0) {
				SL = SL * (-1);
			}
		}
	}

	return {
		isSuccess,
		isFailure,
		isAutoFailure,
		isAutoSuccess,
		isDouble,
		SL
	};
};