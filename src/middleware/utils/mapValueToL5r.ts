import { D10, RING_DIE, SKILL_DIE } from "../../consts/diceConstants";

import {
  EXPLOSIVE_SUCCESS,
  OPPORTUNITY,
  STRIFE,
  SUCCESS,
  BLANK,
} from "../../consts/l5rSymbols";

export default (diceType: string, value: number): string | number => {
  if (diceType === RING_DIE) {
    switch (value) {
      case 1:
        return `${BLANK}_${RING_DIE}`;
      case 2:
        return `${OPPORTUNITY}_${STRIFE}_${RING_DIE}`;
      case 3:
        return `${OPPORTUNITY}_${RING_DIE}`;
      case 4:
        return `${SUCCESS}_${STRIFE}_${RING_DIE}`;
      case 5:
        return `${SUCCESS}_${RING_DIE}`;
      case 6:
        return `${EXPLOSIVE_SUCCESS}_${STRIFE}_${RING_DIE}`;
    }
  } else if (diceType === SKILL_DIE) {
    switch (value) {
      case 1:
      case 2:
        return `${BLANK}_${SKILL_DIE}`;
      case 3:
      case 4:
      case 5:
        return `${OPPORTUNITY}_${SKILL_DIE}`;
      case 6:
      case 7:
        return `${SUCCESS}_${STRIFE}_${SKILL_DIE}`;
      case 8:
      case 9:
        return `${SUCCESS}_${SKILL_DIE}`;
      case 10:
        return `${SUCCESS}_${OPPORTUNITY}_${SKILL_DIE}`;
      case 11:
        return `${EXPLOSIVE_SUCCESS}_${STRIFE}_${SKILL_DIE}`;
      case 12:
        return `${EXPLOSIVE_SUCCESS}_${SKILL_DIE}`;
    }
  } else if (diceType === D10) {
    return Number(value);
  }
  return `${value}`;
};
