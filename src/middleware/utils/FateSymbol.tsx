import React from "react";
import { MINUS, PLUS, FateResult } from "../../consts/fateConsts";
import TooltipWrapper from "../../components/InfoTooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

export const FateSymbol = (result: FateResult) => {
  console.log("fateSymbol resyult", result);
  if (result === PLUS) {
    return (
      <TooltipWrapper content="Plus">
        <FontAwesomeIcon icon={faPlus} />
      </TooltipWrapper>
    );
  } else if (result === MINUS) {
    return (
      <TooltipWrapper content="Minus">
        <FontAwesomeIcon icon={faMinus} />
      </TooltipWrapper>
    );
  }
  return (
    <TooltipWrapper content="Blank">
      <FontAwesomeIcon icon={faSquare} />
    </TooltipWrapper>
  );
};
