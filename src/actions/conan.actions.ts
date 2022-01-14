export const OPEN_CONAN_TOKENS_MODAL = "OPEN_CONAN_TOKENS_MODAL";
export const UPDATE_CONAN_TOKENS_STATE = "UPDATE_CONAN_TOKENS_STATE";
export const CONAN_DICE_ROLLED = "CONAN_DICE_ROLLED";

export function openConanTokensModal() {
  return {
    type: OPEN_CONAN_TOKENS_MODAL,
  };
}

export function updateTokensState(payload: any) {
  return {
    type: UPDATE_CONAN_TOKENS_STATE,
    payload,
  };
}

export function conanDiceRolled(payload: any) {
  return {
    type: CONAN_DICE_ROLLED,
    payload,
  };
}
