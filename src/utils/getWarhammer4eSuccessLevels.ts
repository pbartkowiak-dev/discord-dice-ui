export type successLevelsType = {
	isSuccess: boolean
	isFailure: boolean
	isAutoFailure: boolean
	isAutoSuccess: boolean
	isDouble: boolean,
	SL: number
}

const getTens = (num:number) => Math.floor(num / 10);

export default (skillLevel:number, finalDieResult:number, useFastSL:boolean):successLevelsType => {
	const autoFailureMin = 96;
	const autoFailureMax = 100;
	const autoSuccessMin = 1;
	const autoSuccessMax = 5;

	const isAutoFailure = (finalDieResult >= autoFailureMin && finalDieResult <= autoFailureMax);
	const isAutoSuccess = (finalDieResult >= autoSuccessMin && finalDieResult <= autoSuccessMax);

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