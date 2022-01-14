import React from "react";
import { connect } from "react-redux";
import getDiceSet from "../../utils/getDiceSet";
import {
  POOL,
  NARRATIVE_DICE,
  L5R_DICE,
  ROLL_AND_KEEP_DICE,
  WRATH_AND_GLORY_DICE,
} from "../../consts/diceConstants";
import PoolBuilder from "./PoolBuilder";
import { submitRoll } from "../../actions/roll.actions";

const mapDispatchToProps = { submitRoll };

function PoolBuilderContainer({
  handleSubmit,
  formName,
  maxDicePool,
  submitRoll,
  type,
}: any) {
  let isDiceImgLarge = false;

  let diceSetType;
  if (type === "narrativeDice") {
    diceSetType = NARRATIVE_DICE;
  } else if (type === "l5rMode") {
    diceSetType = L5R_DICE;
    isDiceImgLarge = true;
  } else if (type === "rollAndKeepMode") {
    diceSetType = ROLL_AND_KEEP_DICE;
    isDiceImgLarge = true;
  } else if (type === "wrathAndGloryMode") {
    diceSetType = WRATH_AND_GLORY_DICE;
    isDiceImgLarge = true;
  } else {
    diceSetType = POOL;
  }

  const diceSet = getDiceSet(diceSetType);

  return (
    <PoolBuilder
      handleSubmit={handleSubmit}
      diceSet={diceSet}
      formName={formName}
      isDiceImgLarge={isDiceImgLarge}
      maxDicePool={maxDicePool}
      submitRoll={submitRoll}
    />
  );
}

export default connect(undefined, mapDispatchToProps)(PoolBuilderContainer);
