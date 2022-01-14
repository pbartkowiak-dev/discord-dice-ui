import { L5R_SEND_STATE } from "../../actions/l5r.actions";
import { requestMsgReady } from "../../actions/roll.actions";
import { getColor } from "../../utils/getColor";
import joinAsBlocks from "../../utils/joinAsBlocks";
import { l5rResults } from "../../consts/l5rSymbols";
import l5rDice from "../../consts/l5rDice";
import { RING_DIE, SKILL_DIE } from "../../consts/diceConstants";
import {
  getAdditionalDiceKeptSelector,
  getResultsDerivedSelector,
} from "../../selectors/l5rSelectors";

function l5rResultsToLabel(results: Array<string>): Array<string> {
  const resultsMapped = results.map((result: string) => {
    const diceType = result.includes(RING_DIE) ? RING_DIE : SKILL_DIE;
    const label = l5rResults[result];
    return `${label} (${l5rDice[diceType].label})`;
  });
  return resultsMapped;
}

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === L5R_SEND_STATE) {
    const state = store.getState();
    const { l5rData, userSettings, rerollCount } = state;
    const username = userSettings.username || "USERNAME_MISSING";
    const { results, resultsKept } = l5rData;
    const msgTitle = `${username}'s roll results:`;
    const fields = [];
    let description = "";

    const { success, opportunity, strife } = getResultsDerivedSelector(state);

    const additionalDiceKept = getAdditionalDiceKeptSelector(state);

    if (rerollCount) {
      description = "__Some dice have been rerolled.__";
    }

    if (resultsKept.length) {
      if (description) {
        description += "\n\n";
      }
      description += `Success: \`${success}\` (Explosive Successes inc.)\n`;
      description += `Opportunity: \`${opportunity}\`\n`;
      description += `Strife: \`${strife}\``;
    }

    if (!resultsKept.length) {
      const resultsJoined = joinAsBlocks(
        l5rResultsToLabel(results),
        ",\n",
        true
      );
      fields.push({
        name: ":game_die: Dice rolled:",
        value: `${resultsJoined}.`,
      });
    }

    if (resultsKept.length && !additionalDiceKept.length) {
      const resultsKeptJoined = joinAsBlocks(
        l5rResultsToLabel(resultsKept),
        ",\n",
        true
      );
      fields.push({
        name: ":white_check_mark: Results kept:",
        value: `${resultsKeptJoined}.`,
      });
    }

    if (additionalDiceKept.length) {
      const additionalDiceKeptJoined = joinAsBlocks(
        l5rResultsToLabel(additionalDiceKept),
        ",\n",
        true
      );
      fields.push({
        name: ":boom: Additional dice kept:",
        value: `${additionalDiceKeptJoined}.`,
      });
    }

    store.dispatch(
      requestMsgReady({
        msgTitle,
        description,
        color: getColor(),
        fields,
      })
    );
  }
  next(action);
};
