import { requestMsgReady } from "../actions/roll.actions";
import { getColor } from "../utils/getColor";
import { UPDATE_NARRATIVE_TOKENS_STATE } from "../actions/narrativeDice.actions";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === UPDATE_NARRATIVE_TOKENS_STATE) {
    const {
      payload: { destinyLight, destinyDark },
    } = action;
    const destinyDarkNum = Number(destinyDark);
    const destinyLightNum = Number(destinyLight);
    const fields = [];

    fields.push({
      name: `Dark: \`${destinyDark}\``,
      value:
        destinyDarkNum === 0
          ? "-"
          : new Array(destinyDarkNum).fill(":black_circle:").join(" "),
    });

    fields.push({
      name: `Light: \`${destinyLight}\``,
      value:
        destinyLightNum === 0
          ? "-"
          : new Array(destinyLightNum).fill(":white_circle:").join(" "),
    });

    store.dispatch(
      requestMsgReady({
        msgTitle: "Destiny Points",
        fields,
        color: getColor(),
      })
    );
  }
  next(action);
};
