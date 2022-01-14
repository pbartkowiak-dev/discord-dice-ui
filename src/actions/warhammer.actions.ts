export const OPEN_WARHAMMER_MODAL = "OPEN_WARHAMMER_MODAL";
export const CLOSE_WARHAMMER_MODAL = "CLOSE_WARHAMMER_MODAL";
export const CLOSE_WARHAMMER_RESULTS_MODAL = "CLOSE_WARHAMMER_RESULTS_MODAL";
export const WARHAMMER_ROLL_REQESTED = "WARHAMMER_ROLL_REQESTED";
export const WARHAMMER_DICE_ROLLED = "WARHAMMER_DICE_ROLLED";
export const SAVE_WARHAMMER_SL_TYPE = "SAVE_WARHAMMER_SL_TYPE";
export const WARHAMMER_REROLL_REQUESTED = "WARHAMMER_REROLL_REQUESTED";

export function requestWarhammerRoll(payload: any) {
  return {
    type: WARHAMMER_ROLL_REQESTED,
    payload,
  };
}

export function warhammerDiceRolled(payload: any) {
  return {
    type: WARHAMMER_DICE_ROLLED,
    payload,
  };
}

export function saveSlType(payload: any) {
  return {
    type: SAVE_WARHAMMER_SL_TYPE,
    payload,
  };
}

export function openWarhammerModal() {
  return {
    type: OPEN_WARHAMMER_MODAL,
  };
}

export function closeWarhammerModal() {
  return {
    type: CLOSE_WARHAMMER_MODAL,
  };
}

export function closeWarhammerResultsModal() {
  return {
    type: CLOSE_WARHAMMER_RESULTS_MODAL,
  };
}

export function requestWarhammerReroll() {
  return {
    type: WARHAMMER_REROLL_REQUESTED,
  };
}
