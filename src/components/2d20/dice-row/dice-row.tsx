// @ts-nocheck
import React from "react";
import classNames from "classnames";
import { Field } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./dice-row.module.css";

function DiceRow({
  dice,
  diceMax,
  fortune,
  hoverState,
  handleOnHover,
  handleOnClick,
  isAssistance,
}: any) {
  return (
    <>
      {isAssistance && (
        <div
          className={classNames(
            styles.dieContainer,
            styles.assistance,
            styles.removeDice
          )}
        >
          <FontAwesomeIcon
            className={styles.timesIcon}
            icon={faTimes}
            onClick={() => handleOnClick("0")}
          />
        </div>
      )}
      {new Array(diceMax).fill("_").map((_, index) => {
        const diceAmount = index + 1;
        return (
          <div key={diceAmount} className={styles.dieSelect}>
            <div className={styles.dieContainer}>
              <FontAwesomeIcon
                className={classNames({
                  [styles.diceIcon]: true,
                  [styles.diceIconAssistance]: isAssistance,
                  [styles.active]: Number(dice) >= diceAmount,
                  [styles.hovered]: hoverState >= diceAmount,
                })}
                icon={faDiceD20}
                onMouseEnter={() => handleOnHover(`${diceAmount}`)}
                onMouseLeave={() => handleOnHover(0)}
                onClick={() => handleOnClick(`${diceAmount}`)}
              />
              <span
                className={classNames({
                  [styles.hidden]: diceAmount < 3 || diceAmount > 5,
                  [styles.dieFortunePoint]: true,
                  [styles.show]: Number(fortune) >= diceAmount - 2, // one, two or thee fortune points
                })}
              >
                1
              </span>
            </div>
            <label className={styles.label} key={index}>
              <Field
                name="dice"
                component="input"
                type="radio"
                value={`${diceAmount}`}
                onClick={() => handleOnClick(`${diceAmount}`)}
              />
              <span
                className={classNames({
                  [styles.dieLabelActive]: Number(dice) === diceAmount,
                  [styles.dieLabelAssistance]: isAssistance,
                })}
              >
                {diceAmount}d20
              </span>
            </label>
          </div>
        );
      })}
    </>
  );
}

export default DiceRow;
