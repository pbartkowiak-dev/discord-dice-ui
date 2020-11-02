import { CONAN_DICE_ROLLED, localMsgReady } from "../../actions/roll.actions";
import joinAsBlocks from "../../utils/joinAsBlocks";

export default (store:any) => (next:any) => (action:any) => {
	if (action.type === CONAN_DICE_ROLLED) {
		console.log('CONAN_DICE_ROLLED - action', action);
		// const { payload: { result } } = action;
		// const { payload: { rollOptions } } = action;
		// const {
		// 	results,
		// 	cocBonusResult,
		// 	cocPenaltyResult,
		// 	skillLevel
		// } = result;
		// const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
		// const fields = [];
		// const resultsJoined = joinAsBlocks(results);
		// let finalDieResult;
		// let finalDieResultString;
		// let title;
	

		// store.dispatch(localMsgReady({
		// 	title,
		// 	fields,
		// 	isSuccess: successLevels.isSuccess,
		// 	finalDieResult,
		// 	rollOptions

		// }));
	}
	next(action);
};
