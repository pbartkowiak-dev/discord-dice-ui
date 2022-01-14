export const OPEN_INFINITY_TOKENS_MODAL = "OPEN_INFINITY_TOKENS_MODAL";
export const UPDATE_INFINITY_TOKENS_STATE = "UPDATE_INFINITY_TOKENS_STATE";
export const INFINITY_DICE_ROLLED = "INFINITY_DICE_ROLLED";

export function openInfinityTokensModal() {
  return {
    type: OPEN_INFINITY_TOKENS_MODAL,
  };
}

export function updateTokensState(payload: any) {
  return {
    type: UPDATE_INFINITY_TOKENS_STATE,
    payload,
  };
}

export function infinityDiceRolled(payload: any) {
  return {
    type: INFINITY_DICE_ROLLED,
    payload,
  };
}
