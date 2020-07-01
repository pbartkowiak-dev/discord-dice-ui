export type conanSuccessLevelType = {
	isSuccess: boolean
	isFailure: boolean
	successLevel: number
	compilations: number
	momentum: number
}

export default (
	results: Array<number>,
	tn: number,
	focus: number,
	difficulty: number,
	untrainedTest:boolean
):any => {
	const compilationMinVal = untrainedTest ? 19 : 20;
	const compilationMaxVal = 20;
	let successLevel = 0;
	let compilations = 0;

	results.forEach(result => {
		if (result <= tn) {
			if (result <= focus) {
				successLevel += 2;
			} else if (result > focus) {
				successLevel += 1
			}
		}

		if (result >= compilationMinVal && result <= compilationMaxVal) {
			compilations += 1;
		}
	});

	return {
		isSuccess: successLevel >= difficulty,
		isFailure: successLevel < difficulty,
		successLevel,
		compilations,
		momentum: successLevel > difficulty ? successLevel - difficulty : 0
	};
};
