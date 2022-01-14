import React, { FC } from "react";
import useWrathAndGloryStore from "./store";
import styles from "./WrathDiceNumberSetter.module.css";
import CodeSpan from "../CodeSpan/CodeSpan";
import WrathDieSelector from "./WrathDieSelector";

const WrathDiceNumberSetter: FC = () => {
  const wrathDiceNumber = useWrathAndGloryStore(
    ({ wrathDiceNumber }) => wrathDiceNumber
  );
  const maxWrathDice = 7;

  return (
    <div className={styles.container}>
      <span>
        Set Wrath Dice Number (<CodeSpan>{wrathDiceNumber}</CodeSpan>):
      </span>
      <ul className={styles.iconsRow}>
        {new Array(maxWrathDice + 1).fill(".").map((_: string, index) => (
          <WrathDieSelector wrathDieValue={index} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default WrathDiceNumberSetter;
