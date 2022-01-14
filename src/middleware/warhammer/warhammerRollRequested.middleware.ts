import getResultsArray from "../../utils/getResultsArray";
import {
  WARHAMMER_ROLL_REQESTED,
  warhammerDiceRolled,
} from "../../actions/warhammer.actions";
import getWarhammerSuccessLevels from "../../utils/getWarhammerSuccessLevels";
import getReversedResult from "../../utils/getReversedResult";
import getDarkHeresyIIHitLocation from "../../utils/getDarkHeresyIIHitLocation";
import getWarhammer2eHitLocation from "../../utils/getWarhammer2eHitLocation";
import getWarhammer4eHitLocation from "../../utils/getWarhammer4eHitLocation";
import sl from "../../components/WarhammerModal/sl";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === WARHAMMER_ROLL_REQESTED) {
    const state = store.getState();
    const { warhammerState } = state;
    const { skillLevel } = action.payload;
    const result = getResultsArray(100)[0];
    const { slType } = warhammerState;
    const useDarkHeresySL = slType === sl.dh;
    const useWarhammer2eSL = slType === sl.wfrp2e;

    const successLevels = getWarhammerSuccessLevels({
      skillLevel,
      result,
      useFastSL: slType === sl.fast,
      useDarkHeresySL,
      useWarhammer2eSL,
    });

    let hitLocation;
    const resultReversed = getReversedResult(result);

    if (useDarkHeresySL) {
      hitLocation = getDarkHeresyIIHitLocation(resultReversed);
    } else if (useWarhammer2eSL) {
      hitLocation = getWarhammer2eHitLocation(resultReversed);
    } else {
      hitLocation = getWarhammer4eHitLocation(resultReversed);
    }

    store.dispatch(
      warhammerDiceRolled({
        result,
        resultReversed,
        successLevels,
        skillLevel,
        hitLocation,
      })
    );
  }

  next(action);
};
