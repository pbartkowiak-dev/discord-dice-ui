export default (skillLevel:number, finalDieResult:number) => {
	const critSuccessLevel = 1;
	const fumbleMinLevel = skillLevel >= 50 ? 100 : 96;
	const fumbleMaxLevel = 100;
	const hardSuccessLevel = Math.floor(skillLevel / 2);
	const extremeSuccessLevel = Math.floor(skillLevel / 5);
	const isFumble = (finalDieResult >= fumbleMinLevel && finalDieResult <= fumbleMaxLevel);
	const isSuccess = finalDieResult <= skillLevel;
	const ifFailure = !isSuccess;
	const isHardSuccess = finalDieResult <= hardSuccessLevel;
	const isExtremeSuccess = finalDieResult <= extremeSuccessLevel;
	const isCriticalSuccess = finalDieResult === critSuccessLevel;

	return {
		isFumble,
		isSuccess,
		ifFailure,
		isHardSuccess,
		isExtremeSuccess,
		isCriticalSuccess
	};

	/**
	 *
	 * Fumble: the roll is 100. If the roll required for success is less than 50, a roll of 96 or over is a fumble.
	 * Failure: the roll is above the character’s skill or characteristic (but not a fumble).
	 * Hard success: the roll is equal to or below a half of the character’s skill or characteristic.
	 * Extreme success: the roll is equal to or below a fifth of the character’s skill or characteristic.
	 * Critical success: a roll of 01.
	 *
	 **/
};