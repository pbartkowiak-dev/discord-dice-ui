// export type successLevelsType = {
// 	isSuccess: boolean
// 	isFailure: boolean
// 	isAutoFailure: boolean
// 	isAutoSuccess: boolean
// 	isDouble: boolean,
// 	SL: number
// }

export default (
	skillLevel:number,
	finalDieResult:number,
	useFastSL:boolean,
	useDarkHeresySL:boolean,
	useWarhammer2eSL: boolean
):any => {

	// const complicationMin = isUntrainedTest ? 19 : 20;
	const complicationMax = 20;


	// const isSuccess = (!isAutoFailure && (finalDieResult <= skillLevel)) || isAutoSuccess;
	// const isFailure = (!isAutoSuccess && !isSuccess) || isAutoFailure;

	// return {
		// isSuccess,
		// isFailure,
		// momentumGenerated
	// };
};