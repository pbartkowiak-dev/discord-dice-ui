// @ts-nocheck
import React, { FC } from "react";
import useWrathAndGloryStore from "./store";
import styles from "./WrathAndGloryResultsModal.module.css";
import CodeSpan from "../CodeSpan/CodeSpan";
import joinAsBlocks from "../../utils/joinAsBlocks";

const IconsResultsContainer: FC = () => {
  const exaltedIcons: number[] = useWrathAndGloryStore(
    ({ exaltedIcons }) => exaltedIcons
  );
  const normalIcons: number[] = useWrathAndGloryStore(
    ({ normalIcons }) => normalIcons
  );
  const totalIcons: number[] = useWrathAndGloryStore(
    ({ totalIcons }) => totalIcons
  );
  const wrathDieResults: number[] = useWrathAndGloryStore(
    ({ wrathDieResults }) => wrathDieResults
  );

  let wrathResultComment = "";
  if (wrathDieResults.every((result) => result === 6)) {
    wrathResultComment = " (Critical)";
  } else if (wrathDieResults.includes(1)) {
    wrathResultComment = " (Complication)";
  }

  return (
    <section className={styles.iconsResultsContainer}>
      <div className={styles.totalIconsContainer}>
        <div className={styles.totalIconsScore}>{totalIcons}</div>
        <div className={styles.iconsTextContainer}>
          <span className={styles.totalText}>Total</span>
          <br />
          <span className={styles.iconText}>Icons</span>
        </div>
      </div>
      <div className={styles.iconsResultsData}>
        <div>
          <strong>Exalted Icons</strong>: <CodeSpan>{exaltedIcons}</CodeSpan>
        </div>
        <div>
          <strong>Normal Icons</strong>: <CodeSpan>{normalIcons}</CodeSpan>
        </div>
        {wrathDieResults.length > 0 && (
          <div>
            <strong>
              {wrathDieResults === 1 ? "Wrath Die" : "Wrath Dice"}
            </strong>
            : <CodeSpan>{joinAsBlocks(wrathDieResults)}</CodeSpan>{" "}
            {wrathResultComment ? (
              <CodeSpan>{wrathResultComment}</CodeSpan>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default IconsResultsContainer;
