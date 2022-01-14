import { requestMsgReady } from "../../actions/roll.actions";
import {
  ROLL_AND_KEEP_ROLL_REQUESTED,
  rollAndKeepDiceRolled,
} from "../../actions/rollAndKeep.actions";
import { D10 } from "../../consts/diceConstants";
import { getColor } from "../../utils/getColor";
import getResultsArray from "../../utils/getResultsArray";
import joinAsBlocks from "../../utils/joinAsBlocks";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === ROLL_AND_KEEP_ROLL_REQUESTED) {
    const { pool, modifier, isReroll } = action.payload;
    const diceAmount = pool[D10];

    const getResults = (results: number[] = []) => {
      const result = getResultsArray(10)[0];
      results.push(result);
      if (result === 10) {
        getResults(results);
      }
      return results;
    };

    const results: Array<Array<number>> = new Array(diceAmount)
      .fill("_")
      .map(() => getResults());

    if (results.length) {
      const state = store.getState();
      const { userSettings, rerollCount } = state;
      const username = userSettings.username || "USERNAME_MISSING";

      const description = results.reduce(
        (acc: string, resultsRow: number[]) => {
          const sum = resultsRow.reduce((a, b) => a + b, 0);
          return acc + `${sum} (${joinAsBlocks(resultsRow, "+ ", true)})\n`;
        },
        ""
      );

      const fields = [];

      if (isReroll) {
        const trueRerollCount = rerollCount + 1;
        const rerollCountStr = trueRerollCount === 1 ? "time" : "times";
        fields.push({
          name: `:game_die: Reroll Count:`,
          value: `The dice have been rerolled \`${trueRerollCount}\` ${rerollCountStr}.`,
        });
      }

      if (modifier && Number(modifier)) {
        const modifierIcon =
          Number(modifier) > 0 ? ":arrow_up:" : ":arrow_down:";
        const modifierSign = Number(modifier) > 0 ? "+" : "";
        fields.push({
          name: `${modifierIcon} Modifier:`,
          value: `\`${modifierSign}${modifier}\``,
        });
      }

      store.dispatch(
        requestMsgReady({
          msgTitle: `${username}'s roll results:`,
          description,
          color: getColor(),
          fields,
        })
      );

      store.dispatch(
        rollAndKeepDiceRolled({
          results,
          modifier: Number(modifier),
        })
      );
    }
  }
  next(action);
};
