import React from "react";
import { useDispatch } from "react-redux";
import "./DiceModule.css";
import Dice from "./Dice";
import getDiceSet from "../../utils/getDiceSet";
import { CONAN, INFINITY, WARHAMMER, DUNE } from "../../consts/consts";
import { CLASSIC, TOR_DICE } from "../../consts/diceConstants";
import { COC } from "../../consts/consts";
import { FATE_DICE, FATE_DIE } from "../../consts/fateConsts";
import useDiceModuleFormStore from "../DiceModuleOptions/store";
import { submitRoll } from "../../actions/roll.actions";

function DiceModule() {
  const dispatch = useDispatch();
  const { mode } = useDiceModuleFormStore((state) => state);

  const handleRollDice = (diceType: string, diceAmount?: number) => {
    let diceAmountToRoll: number;

    if (!diceAmount) {
      // 4 dice is default for Fate Dice
      if (diceType === FATE_DIE) {
        diceAmountToRoll = 4;
      } else {
        diceAmountToRoll = 1;
      }
    } else {
      diceAmountToRoll = diceAmount;
    }

    dispatch(
      submitRoll({
        diceType,
        diceAmount: diceAmountToRoll,
      })
    );
  };

  // @TODO MOVE TO ONE DICE SET GETTER
  let diceSetType;
  if (mode === "warhammerMode") {
    diceSetType = WARHAMMER;
  } else if (mode === "conanMode") {
    diceSetType = CONAN;
  } else if (mode === "infinityMode") {
    diceSetType = INFINITY;
  } else if (mode === "duneMode") {
    diceSetType = DUNE;
  } else if (mode === "cthulhuMode") {
    diceSetType = COC;
  } else if (mode === "fateMode") {
    diceSetType = FATE_DICE;
  } else if (mode === "torMode") {
    diceSetType = TOR_DICE;
  } else {
    diceSetType = CLASSIC;
  }

  const diceSet = getDiceSet(diceSetType);

  const diceSetElement = diceSet.map(
    ({ diceType, label, diceImg, noDropdown }) => (
      <Dice
        key={diceType}
        diceType={diceType}
        diceImg={diceImg}
        label={label}
        handleRollDice={handleRollDice}
        noDropdown={noDropdown}
      />
    )
  );

  return <div className="dice-module dice-list">{diceSetElement}</div>;
}

export default DiceModule;
