import { WARHAMMER_MONEY_RECALCULATED } from "../actions/modals";
import { requestMsgReady } from "../actions/roll.actions";
import { getColor } from "../utils/getColor";
import { MONEY_GOLD, MONEY_SILVER, MONEY_BRASS } from "../consts/consts";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === WARHAMMER_MONEY_RECALCULATED) {
    const state = store.getState();
    const { userSettings } = state;
    const username = userSettings.username || "USERNAME_MISSING";
    const { moneyState, moneyToAddState, newResultState, operationState } =
      action.payload;

    const description = `
			\`${moneyState[MONEY_GOLD]} GC\` \`${moneyState[MONEY_SILVER]} ss\` \`${
      moneyState[MONEY_BRASS]
    } d\`
			\`${moneyToAddState[MONEY_GOLD]} GC\` \`${
      moneyToAddState[MONEY_SILVER]
    } ss\` \`${moneyToAddState[MONEY_BRASS]} d\`
			${
        operationState === "ADD" ? ":heavy_plus_sign:" : ":heavy_minus_sign:"
      } ---------------------------
			= :yellow_circle: \`${newResultState[MONEY_GOLD]} GC\` :white_circle: \`${
      newResultState[MONEY_SILVER]
    } ss\` :brown_circle: \`${newResultState[MONEY_BRASS]} d\`
		`;
    store.dispatch(
      requestMsgReady({
        msgTitle: `${username} converted (${
          operationState === "ADD" ? "added" : "subtracted"
        }) some money`,
        color: getColor(),
        description,
      })
    );
  }
  next(action);
};
