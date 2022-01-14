import React from "react";
import classNames from "classnames/bind";
import getConanSuccessLevel, {
  conanSuccessLevelType,
} from "../../utils/getConanSuccessLevel";
import ResultVsSkillRow, {
  labelsType,
} from "../../components/ResultVsSkillRow/ResultVsSkillRow";
import styles from "../../components/ResultsModal/ResultsModal.module.css";
import CodeSpan from "../../components/CodeSpan/CodeSpan";
import { localMsgReady } from "../../actions/roll.actions";
import { CONAN_DICE_ROLLED } from "../../actions/conan.actions";
import joinAsBlocks from "../../utils/joinAsBlocks";
import tooltip from "../../locale/tooltip";
import InfoTooltip from "../../components/InfoTooltip/InfoTooltip";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === CONAN_DICE_ROLLED) {
    const cx = classNames.bind(styles);
    const state = store.getState();
    const { rerollCount } = state;
    const {
      payload: { result },
    } = action;
    const {
      payload: { rollOptions },
    } = action;
    const { results, assistanceDiceResults } = result;
    const {
      diceAmount,
      difficulty,
      focus,
      fortune,
      tn,
      untrainedTest,
      assistanceDice,
      assistanceFocus,
      assistanceTn,
      assistanceUntrainedTest,
    } = rollOptions;

    const fields = [];
    let assistanceSuccessLevel: any = {};

    if (assistanceDice && assistanceDiceResults) {
      assistanceSuccessLevel = getConanSuccessLevel({
        results: assistanceDiceResults,
        tn: assistanceTn,
        focus: assistanceFocus,
        difficulty: Number(difficulty),
        untrainedTest: assistanceUntrainedTest || untrainedTest,
      });
    }

    const successLevel: conanSuccessLevelType = getConanSuccessLevel({
      results,
      tn,
      focus,
      difficulty,
      assistanceSuccessLevel: assistanceSuccessLevel.successLevel,
      untrainedTest,
    });
    const yourFocus = (
      <p className={styles.resultDetailsRow}>
        Focus: <CodeSpan>{focus || 0}</CodeSpan>
      </p>
    );
    const yourTn = (
      <p className={styles.resultDetailsRow}>
        TN: <CodeSpan>{tn}</CodeSpan>
      </p>
    );
    const wasUntrainedTest = untrainedTest ? (
      <p className={styles.resultDetailsRow}>Untrained Test</p>
    ) : null;

    const fortuneUsed = !!fortune ? (
      <p className={styles.resultDetailsRow}>
        Fortune points used: <CodeSpan>{fortune}</CodeSpan>
      </p>
    ) : null;

    const title = (
      <div className={styles.conanResultDetails}>
        <p className={styles.resultDetailsRow}>
          You rolled <CodeSpan>{diceAmount}d20</CodeSpan>
        </p>
        {yourFocus}
        {yourTn}
        {wasUntrainedTest}
        {fortuneUsed}
      </div>
    );

    if (rerollCount) {
      const timesWord = rerollCount === 1 ? "time" : "times";
      fields.push(
        <div className={`${styles.generalResult}`}>
          Rerolled <CodeSpan>{rerollCount}</CodeSpan> {timesWord}
        </div>
      );
    }

    if (assistanceDice && assistanceDiceResults?.length) {
      const assistanceDiceResultsJoined = joinAsBlocks(assistanceDiceResults);
      const assistanceComplications = assistanceSuccessLevel.complications ? (
        <p className={styles.assistanceResultRow}>
          Complications:{" "}
          <CodeSpan type="failure">
            {assistanceSuccessLevel.complications}
          </CodeSpan>
        </p>
      ) : null;

      fields.push(
        <div
          className={classNames([
            styles.conanResultDetails,
            styles.conanResultDetailsAssistance,
          ])}
        >
          <p className={styles.resultDetailsRow}>
            <strong>Assistance Roll:</strong>
          </p>
          <p className={styles.resultDetailsRow}>
            Rolled: {assistanceDiceResultsJoined}
          </p>
          {assistanceFocus !== "" && (
            <p className={styles.resultDetailsRow}>
              Assistance Focus: <CodeSpan>{assistanceFocus}</CodeSpan>
            </p>
          )}
          {assistanceTn !== "" && (
            <p className={styles.resultDetailsRow}>
              Assistance TN: <CodeSpan>{assistanceTn}</CodeSpan>
            </p>
          )}
          {assistanceUntrainedTest && (
            <p className={styles.resultDetailsRow}>Assistance Untrained Test</p>
          )}
          <p className={styles.resultDetailsRow}>
            Successes:{" "}
            <CodeSpan
              type={assistanceSuccessLevel.successLevel > 0 ? "success" : ""}
            >
              {assistanceSuccessLevel.successLevel}
            </CodeSpan>
          </p>
          {assistanceComplications}
          <InfoTooltip
            content={tooltip.assistance}
            className={styles.assistanceIcon}
          />
        </div>
      );
    }

    const labels: labelsType = {
      result: "Successes",
      vs: "Difficulty",
    };

    fields.push(
      <ResultVsSkillRow
        skillLevel={difficulty}
        finalDieResult={successLevel.successLevel}
        isSuccess={successLevel.isSuccess}
        labels={labels}
      />
    );

    if (successLevel.isSuccess) {
      fields.push(
        <div
          className={cx({ generalResult: true, generalResultSuccess: true })}
        >
          Success
        </div>
      );
    } else {
      fields.push(
        <div
          className={cx({ generalResult: true, generalResultFailure: true })}
        >
          Failure
        </div>
      );
    }

    fields.push(
      <div className={cx({ slResult: true, momentumResults: true })}>
        <div>
          {/* COMPLICATIONS */}
          <div>
            <span
              className={cx({
                slResultLabel: true,
                inactive: successLevel.complications === 0,
              })}
            >
              Complications:
            </span>
          </div>
          <div>
            <CodeSpan
              className={styles.slResultSpan}
              type={successLevel.complications > 0 ? "failure" : "inactive"}
            >
              {successLevel.complications}
            </CodeSpan>
          </div>
        </div>
        <div>
          {/* MOMENTUM */}
          <div>
            <span
              className={cx({
                slResultLabel: true,
                inactive: successLevel.momentum === 0,
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
    );

    store.dispatch(
      localMsgReady({
        title,
        fields,
        isSuccess: successLevel.isSuccess,
        isFailure: successLevel.isFailure,
        rollOptions,
        results,
      })
    );
  }
  next(action);
};
