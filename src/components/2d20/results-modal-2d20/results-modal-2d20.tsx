import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../../ResultsModal/ResultsModal.module.css";

import classNames from "classnames";
import RerollContainer from "../../Reroll/RerollContainer";
import { ResultsModalPropTypes } from "../../ResultsModal/ResultsModalTypes";
import CodeSpan from "../../CodeSpan/CodeSpan";
import joinAsBlocks from "../../../utils/joinAsBlocks";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import tooltip from "../../../locale/tooltip";
import ResultVsSkillRow from "../../ResultVsSkillRow/ResultVsSkillRow";
import { getComplicationRangeName } from "../complication-range/complication-range";
import { D20_DUNE_TEST } from "../../../consts/diceConstants";

interface ResultsModal2d20Type extends ResultsModalPropTypes {
  diceType: string;
}

function ResultsModal2d20({
  hideMsg,
  msgData,
  showModal,
  diceType,
}: ResultsModal2d20Type) {
  const { msgParams } = msgData;
  const {
    rollOptions,
    results,
    successLevel,
    assistanceSuccessLevel,
    assistanceDiceResults,
    rerollCount,
  } = msgParams;

  if (!successLevel) {
    return null;
  }

  const isDune = diceType === D20_DUNE_TEST;
  const { isSuccess } = successLevel;

  // Actual values
  const {
    diceAmount,
    difficulty,
    focus,
    fortune,
    tn,
    assistanceDice,
    untrainedTest,
    assistanceFocus,
    assistanceTn,
    assistanceUntrainedTest,
    complicationRange,
  } = rollOptions;

  let complicationThreshold;

  if (complicationRange) {
    complicationThreshold = 21 - complicationRange;
  } else {
    complicationThreshold = untrainedTest ? 19 : 20;
  }

  return (
    <Modal show={showModal} onHide={hideMsg}>
      <Modal.Header
        closeButton
        className={classNames({
          [`${styles.isFailure}`]: isSuccess === false,
          [`${styles.resultsModalHeader}`]: true,
        })}
      >
        <Modal.Title className={styles.resultsModalTitle}>
          Roll Results
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.resultsBody}>
        <div className={styles.rollResults}>
          {/* TITLE */}
          <div className={styles.conanResultDetails}>
            <div className={styles.resultDetailsRow}>
              You rolled <CodeSpan>{`${diceAmount}d20`}</CodeSpan>
            </div>
            {results.length === 1 && (
              <div className={styles.resultDetailsRow}>
                Result: <CodeSpan>{results[0]}</CodeSpan>
              </div>
            )}
            <div className={styles.resultDetailsRow}>
              Focus: <CodeSpan>{focus || 0}</CodeSpan>
            </div>
            <div className={styles.resultDetailsRow}>
              TN: <CodeSpan>{tn}</CodeSpan>
            </div>
            {untrainedTest && (
              <div className={styles.resultDetailsRow}>Untrained Test</div>
            )}
            {!!fortune && (
              <div className={styles.resultDetailsRow}>
                {isDune ? "Determination" : "Fortune"} points used:{" "}
                <CodeSpan>{fortune}</CodeSpan>
              </div>
            )}
            {!!complicationRange && (
              <div className={styles.resultDetailsRow}>
                Complication Range: <CodeSpan>{complicationRange}</CodeSpan>(
                <em>{getComplicationRangeName(complicationRange)}</em>)
              </div>
            )}
          </div>
        </div>
        {/*  Rerroll Count Field*/}
        {!!rerollCount && (
          <div className={`${styles.generalResult}`}>
            Rerolled <CodeSpan>{rerollCount}</CodeSpan>{" "}
            {rerollCount === 1 ? "time" : "times"}
          </div>
        )}
        {/*  Assistance Field */}
        {!!assistanceDice && (
          <div
            className={classNames(
              styles.conanResultDetails,
              styles.conanResultDetailsAssistance
            )}
          >
            <div className={styles.resultDetailsRow}>
              <strong>Assistance Roll:</strong>
            </div>
            <div className={styles.resultDetailsRow}>
              Rolled:{" "}
              {assistanceDiceResults
                ? joinAsBlocks(assistanceDiceResults)
                : null}
            </div>
            {assistanceFocus !== "" && (
              <div className={styles.resultDetailsRow}>
                Assistance Focus: <CodeSpan>{assistanceFocus}</CodeSpan>
              </div>
            )}
            {assistanceTn !== "" && (
              <div className={styles.resultDetailsRow}>
                Assistance TN: <CodeSpan>{assistanceTn}</CodeSpan>
              </div>
            )}
            {!!assistanceUntrainedTest && (
              <div className={styles.resultDetailsRow}>
                Assistance Untrained Test
              </div>
            )}
            <div className={styles.resultDetailsRow}>
              Successes:{" "}
              <CodeSpan
                type={assistanceSuccessLevel.successLevel > 0 ? "success" : ""}
              >
                {assistanceSuccessLevel.successLevel}
              </CodeSpan>
            </div>
            {!!assistanceSuccessLevel.complications && (
              <div className={styles.assistanceResultRow}>
                Complications:{" "}
                <CodeSpan type="complication">
                  {assistanceSuccessLevel.complications}
                </CodeSpan>
              </div>
            )}
            <InfoTooltip
              content={tooltip.assistance}
              className={styles.assistanceIcon}
            />
          </div>
        )}
        {/* Results Vs Skill Row*/}
        <ResultVsSkillRow
          skillLevel={difficulty}
          finalDieResult={successLevel.successLevel}
          isSuccess={successLevel.isSuccess}
          labels={{
            result: "Successes",
            vs: "Difficulty",
          }}
        />
        {/* Success of Failure */}
        <div
          className={classNames({
            [`${styles.generalResult}`]: true,
            [`${styles.generalResultSuccess}`]: successLevel.isSuccess,
            [`${styles.generalResultFailure}`]: !successLevel.isSuccess,
          })}
        >
          {successLevel.isSuccess ? "Success" : "Failure"}
        </div>
        {/* Complications and Momentum */}
        <div className={classNames(styles.slResult, styles.momentumResults)}>
          <div>
            <div>
              <span
                className={classNames({
                  [`${styles.slResultLabel}`]: true,
                  [`${styles.inactive}`]: successLevel.complications === 0,
                })}
              >
                Complications:
              </span>
            </div>
            <div>
              <CodeSpan
                className={styles.slResultSpan}
                type={
                  successLevel.complications > 0 ? "complication" : "inactive"
                }
              >
                {successLevel.complications}
              </CodeSpan>
            </div>
          </div>
          <div>
            <div>
              <span
                className={classNames({
                  [`${styles.slResultLabel}`]: true,
                  [`${styles.inactive}`]: successLevel.momentum === 0,
                })}
              >
                Momentum:
              </span>
            </div>
            <div>
              <CodeSpan
                className={styles.slResultSpan}
                type={successLevel.momentum > 0 ? "success" : "inactive"}
              >
                {successLevel.momentum}
              </CodeSpan>
            </div>
          </div>
        </div>
        {/* Reroll Container*/}
        <RerollContainer
          complicationThreshold={complicationThreshold}
          isPool={false}
          results={results}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button block variant="outline-secondary" onClick={hideMsg}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultsModal2d20;
