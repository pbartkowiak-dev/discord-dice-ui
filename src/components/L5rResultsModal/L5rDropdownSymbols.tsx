import React from "react";
import CodeSpan from "../CodeSpan/CodeSpan";
import l5rSymbols, {
  EXPLOSIVE_SUCCESS,
  OPPORTUNITY,
  STRIFE,
  SUCCESS,
} from "../../consts/l5rSymbols";
import { RING_DIE } from "../../consts/diceConstants";
import l5rDice from "../../consts/l5rDice";
import l5rStyles from "./L5rResultsModal.module.css";

const symbols = {
  explosiveSuccess: require(`../../img/l5r/explosive_success.png`),
  opportunity: require(`../../img/l5r/opportunity.png`),
  strife: require(`../../img/l5r/strife.png`),
  success: require(`../../img/l5r/success.png`),
  blank_ring_die: require("../../img/l5r/blank_ring_die.png"),
};

export const ExplosiveSuccessImg = (
  <CodeSpan>
    <img
      className={l5rStyles.dropdownIcon}
      src={symbols.explosiveSuccess}
      alt={l5rSymbols[EXPLOSIVE_SUCCESS].label}
      title={l5rSymbols[EXPLOSIVE_SUCCESS].label}
    />
  </CodeSpan>
);
export const OpportunityImg = (
  <CodeSpan>
    <img
      className={l5rStyles.dropdownIcon}
      src={symbols.opportunity}
      alt={l5rSymbols[OPPORTUNITY].label}
      title={l5rSymbols[OPPORTUNITY].label}
    />
  </CodeSpan>
);
export const StrifeImg = (
  <CodeSpan>
    <img
      className={l5rStyles.dropdownIcon}
      src={symbols.strife}
      alt={l5rSymbols[STRIFE].label}
      title={l5rSymbols[STRIFE].label}
    />
  </CodeSpan>
);
export const SuccessImg = (
  <CodeSpan>
    <img
      className={l5rStyles.dropdownIcon}
      src={symbols.success}
      alt={l5rSymbols[SUCCESS].label}
      title={l5rSymbols[SUCCESS].label}
    />
  </CodeSpan>
);
export const BlackRingImg = (
  <CodeSpan>
    <img
      className={l5rStyles.dropdownIconDie}
      src={symbols.blank_ring_die}
      alt={l5rDice[RING_DIE].label}
      title={l5rDice[RING_DIE].label}
    />
  </CodeSpan>
);
