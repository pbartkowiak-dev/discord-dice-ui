import {
  CTHULHU_ROLL_REQESTED,
  cthulhuDiceRolled,
} from "../../actions/cthulhu.actions";
import getResultsArray from "../../utils/getResultsArray";
import getSuccessLevels from "../../utils/getSuccessLevels";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === CTHULHU_ROLL_REQESTED) {
    const {
      skillLevel,
      cthulhuBonus,
      cthulhuTwoBonus,
      cthulhuPenalty,
      cthulhuTwoPenalty,
    } = action.payload;

    let diceAmount = 1;

    if (cthulhuBonus || cthulhuPenalty) {
      diceAmount = 2;
    } else if (cthulhuTwoBonus || cthulhuTwoPenalty) {
      diceAmount = 3;
    }

    const keepUnits =
      cthulhuBonus || cthulhuTwoBonus || cthulhuPenalty || cthulhuTwoPenalty;
    const rollResults = getResultsArray(100, diceAmount, keepUnits);

    let finalDieResult = rollResults[0];

    if (cthulhuBonus || cthulhuTwoBonus) {
      finalDieResult = Math.min(...rollResults);
    } else if (cthulhuPenalty || cthulhuTwoPenalty) {
      finalDieResult = Math.max(...rollResults);
    }

    const successLevels = getSuccessLevels(skillLevel, finalDieResult);

    store.dispatch(
      cthulhuDiceRolled({
        ...action.payload,
        skillLevel,
        finalDieResult,
        successLevels,
        rollResults,
      })
    );
  }

  next(action);
};
