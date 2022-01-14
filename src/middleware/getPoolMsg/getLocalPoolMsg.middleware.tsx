import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import joinAsBlocks from "../../utils/joinAsBlocks";
import CodeSpan from "../../components/CodeSpan/CodeSpan";
import styles from "../../components/ResultsModal/ResultsModal.module.css";
import { DICE_POOL_ROLLED, localMsgReady } from "../../actions/roll.actions";

const IconRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />;

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === DICE_POOL_ROLLED) {
    const state = store.getState();
    const { rerollCount } = state;
    const { results, modifier } = action.payload;
    const allResults: Array<number> = [];
    const fields = [];
    let andModifier = null;

    if (rerollCount) {
      const timesWord = rerollCount === 1 ? "time" : "times";
      fields.push(
        <div className={styles.generalResult}>
          Rerolled <CodeSpan>{rerollCount}</CodeSpan> {timesWord}
        </div>
      );
    }

    Object.keys(results).forEach((diceType: string) => {
      const resultsForDiceType: Array<number> = results[diceType];
      fields.push(
        <div
          className={classNames(styles.poolResultsBlock, styles.resultsBlock)}
        >
          <div className={styles.resultsBlockImageContainer}>
            <img
              className={styles.resultsBlockImage}
              src={require(`../../img/${diceType}.png`)}
              alt={diceType}
            />
          </div>
          <div className={styles.resultsBlockContentContainer}>
            <div>
              <strong>
                {resultsForDiceType.length}
                {diceType}:
              </strong>
            </div>
            <div>{joinAsBlocks(resultsForDiceType)}</div>
          </div>
        </div>
      );

      resultsForDiceType.forEach((result: number) => {
        allResults.push(result);
      });
    });

    if (modifier && modifier !== "0") {
      const modSymbol = Number(modifier) > 0 ? "+" : "-";
      const modWithSymbol = `${modSymbol}${Math.abs(modifier)}`;
      fields.push(
        <div className={styles.poolModifierResult}>
          Modifier: <CodeSpan>{modWithSymbol}</CodeSpan>
        </div>
      );
      andModifier = (
        <>
          {" "}
          (and <CodeSpan>{modWithSymbol}</CodeSpan>modifier)
        </>
      );
    }

    const sumJoined = joinAsBlocks(allResults, "+");
    const total = allResults.reduce((a, b) => a + b, 0);

    fields.push(
      <div>
        <div>
          {IconRight} <strong>Sum of</strong> {sumJoined}
          <strong>{andModifier}:</strong>
        </div>
        <div>
          Total:{" "}
          <CodeSpan>{modifier ? total + Number(modifier) : total}</CodeSpan>
        </div>
      </div>
    );

    store.dispatch(
      localMsgReady({
        fields,
        results,
        isPool: true,
      })
    );
  }
  next(action);
};
