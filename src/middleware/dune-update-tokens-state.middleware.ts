import { requestMsgReady } from "../actions/roll.actions";
import { getColor } from "../utils/getColor";
import { UPDATE_DUNE_TOKENS_STATE } from "../actions/dune.actions";

export const duneUpdateTokensState =
  (store: any) => (next: any) => (action: any) => {
    if (action.type === UPDATE_DUNE_TOKENS_STATE) {
      const {
        payload: { momentum, threat },
      } = action;
      const threatNum = Number(threat);
      const momentumNum = Number(momentum);
      const fields = [];

      fields.push({
        name: `Threat \`${threat}\`:`,
        value:
          threatNum === 0
            ? "-"
            : new Array(threatNum).fill(":brown_circle:").join(" "),
      });

      fields.push({
        name: `Momentum \`${momentum}\`:`,
        value:
          momentumNum === 0
            ? "-"
            : new Array(momentumNum).fill(":yellow_circle:").join(" "),
      });

      store.dispatch(
        requestMsgReady({
          msgTitle: "Dune Threat / Momentum Pools",
          fields,
          color: getColor(),
        })
      );
    }
    next(action);
  };
