export type successLevelsType = {
	isFumble: boolean
	isRegularFailure: boolean
	isSuccess: boolean
	isFailure: boolean
	isCriticalSuccess: boolean
	isExtremeSuccess: boolean
	isHardSuccess: boolean
	isRegularSuccess: boolean
}

export default (skillLevel:number, finalDieResult:number) :successLevelsType => {
	const critSuccessLevel = 1;
	const hardSuccessLevel = Math.floor(skillLevel / 2);
	const extremeSuccessLevel = Math.floor(skillLevel / 5);
	const fumbleMinLevel = skillLevel >= 50 ? 100 : 96;
	const fumbleMaxLevel = 100;
	
	const isSuccess = finalDieResult <= skillLevel;
	const isFailure = !isSuccess;

	const isFumble = (finalDieResult >= fumbleMinLevel && finalDieResult <= fumbleMaxLevel);
	const isRegularFailure = !isFumble && isFailure;

	const isCriticalSuccess = finalDieResult === critSuccessLevel;
	const isExtremeSuccess = (!isCriticalSuccess) && (finalDieResult <= extremeSuccessLevel);
	const isHardSuccess = (!isCriticalSuccess && !isExtremeSuccess ) && (finalDieResult <= hardSuccessLevel);
	const isRegularSuccess = isSuccess && !isCriticalSuccess && !isExtremeSuccess && !isHardSuccess;

	return {
		isFumble,
		isRegularFailure,
		isSuccess,
		isFailure,
		isCriticalSuccess,
		isExtremeSuccess,
		isHardSuccess,
		isRegularSuccess
	};
};