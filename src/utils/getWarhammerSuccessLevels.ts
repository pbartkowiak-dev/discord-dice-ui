export type successLevelsType = {
	isSuccess: boolean
	isFailure: boolean
	isAutoFailure: boolean
	isAutoSuccess: boolean
	isDouble: boolean,
	SL: number
}

const getTens = (num:number) => Math.floor(num / 10);

export default (
	skillLevel:number,
	finalDieResult:number,
	useFastSL:boolean,
	useDarkHeresySL:boolean,
	useWarhammer2eSL: boolean
):successLevelsType => {
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

	const isAutoFailure = !useWarhammer2eSL && (finalDieResult >= autoFailureMin && finalDieResult <= autoFailureMax);
	const isAutoSuccess = !useWarhammer2eSL && (finalDieResult >= autoSuccessMin && finalDieResult <= autoSuccessMax);

	const isSuccess = (!isAutoFailure && (finalDieResult <= skillLevel)) || isAutoSuccess;
	const isFailure = (!isAutoSuccess && !isSuccess) || isAutoFailure;

	const isDouble = finalDieResult % 11 === 0;

	let SL;
	if (useFastSL && isSuccess) {
		SL = getTens(finalDieResult);
	} else {
		const rolledTens = getTens(finalDieResult);
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
			SL = Math.floor((skillLevel - finalDieResult) / 10);
		} else if (isFailure) {
			SL = (Math.floor((finalDieResult - skillLevel) / 10));
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