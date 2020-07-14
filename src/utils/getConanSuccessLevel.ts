export type conanSuccessLevelType = {
	isSuccess: boolean
	isFailure: boolean
	successLevel: number
	complications: number
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
	let complications = 0;

	results.forEach(result => {
		if (result <= tn) {
			if (result <= focus) {
				successLevel += 2;
			} else if (result > focus) {
				successLevel += 1
			}
		}
		if (result >= compilationMinVal && result <= compilationMaxVal) {
			complications += 1;
		}
	});

	return {
		isSuccess: successLevel >= difficulty,
		isFailure: successLevel < difficulty,
		successLevel,
		complications,
		momentum: successLevel > difficulty ? successLevel - difficulty : 0
	};
};
