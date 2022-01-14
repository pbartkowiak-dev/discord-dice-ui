export const ROLL_AND_KEEP_REROLL_REQUESTED = "ROLL_AND_KEEP_REROLL_REQUESTED";
export const ROLL_AND_KEEP_DICE_REROLLED = "ROLL_AND_KEEP_DICE_REROLLED";
export const ROLL_AND_KEEP_ROLL_REQUESTED = "ROLL_AND_KEEP_ROLL_REQUESTED";
export const ROLL_AND_KEEP_DICE_ROLLED = "ROLL_AND_KEEP_DICE_ROLLED";
export const ROLL_AND_KEEP_RESULTS_KEPT = "ROLL_AND_KEEP_RESULTS_KEPT";

export function requestRollAndKeepRoll(payload: any) {
  return {
    type: ROLL_AND_KEEP_ROLL_REQUESTED,
    payload,
  };
}

export function requestRollAndKeepReroll(payload: any) {
  return {
    type: ROLL_AND_KEEP_REROLL_REQUESTED,
    payload,
  };
}

export function rollAndKeepDiceRerolled(payload: any) {
  return {
    type: ROLL_AND_KEEP_DICE_REROLLED,
    payload,
  };
}

export function rollAndKeepDiceRolled(payload: any) {
  return {
    type: ROLL_AND_KEEP_DICE_ROLLED,
    payload,
  };
}

export function keepDice(payload: any) {
  return {
    type: ROLL_AND_KEEP_RESULTS_KEPT,
    payload,
  };
}
