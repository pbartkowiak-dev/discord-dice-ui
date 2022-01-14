import {
  BOOST,
  DIFFICULTY,
  ABILITY,
  CHALLENGE,
  FORCE,
  PROFICIENCY,
  SETBACK,
  RING_DIE,
  SKILL_DIE,
  TOR_SUCCESS_DIE,
  TOR_FEAT_DIE,
} from "../consts/diceConstants";
import { FATE_DIE } from "../consts/fateConsts";

export default (diceType: string | number): number => {
  if (typeof diceType === "number") {
    return diceType;
  }

  if (
    diceType === BOOST ||
    diceType === SETBACK ||
    diceType === RING_DIE ||
    diceType === FATE_DIE ||
    diceType === TOR_SUCCESS_DIE
  ) {
    return 6;
  } else if (diceType === ABILITY || diceType === DIFFICULTY) {
    return 8;
  } else if (
    diceType === PROFICIENCY ||
    diceType === CHALLENGE ||
    diceType === FORCE ||
    diceType === SKILL_DIE ||
    diceType === TOR_FEAT_DIE
  ) {
    return 12;
  }

  return Number(diceType.replace(/\D/g, ""));
};
