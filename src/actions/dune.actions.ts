export const OPEN_DUNE_TOKENS_MODAL = "OPEN_DUNE_TOKENS_MODAL";
export const UPDATE_DUNE_TOKENS_STATE = "UPDATE_DUNE_TOKENS_STATE";
export const DUNE_DICE_ROLLED = "DUNE_DICE_ROLLED";

export function openDuneTokensModal() {
  return {
    type: OPEN_DUNE_TOKENS_MODAL,
  };
}

export function updateTokensState(payload: any) {
  return {
    type: UPDATE_DUNE_TOKENS_STATE,
    payload,
  };
}

export function duneDiceRolled(payload: any) {
  return {
    type: DUNE_DICE_ROLLED,
    payload,
  };
}
