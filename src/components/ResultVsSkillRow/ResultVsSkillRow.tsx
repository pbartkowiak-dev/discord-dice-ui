import React from "react";
import CodeSpan from "../CodeSpan/CodeSpan";
import styles from "./ResultVsSkillRow.module.css";

export type labelsType = {
  result: string;
  vs: string;
};

type ResultVsSkillRowPropTypes = {
  skillLevel: number | string;
  finalDieResult: number | string;
  isSuccess: boolean;
  labels?: labelsType;
};

function ResultVsSkillRow({
  skillLevel,
  finalDieResult,
  isSuccess,
  labels,
}: ResultVsSkillRowPropTypes) {
  const codeSpanType = isSuccess ? "success" : "failure";
  let resultLabel;
  let vsLabel;

  if (labels) {
    resultLabel = labels.result;
    vsLabel = labels.vs;
  } else {
    resultLabel = "Roll result";
    vsLabel = "Skill level";
  }

  return (
    <div className={styles.ResultVsSkillRow}>
      <div className={styles.Cell}>
        <CodeSpan className={styles.resultValue} type={codeSpanType}>
          {finalDieResult}
        </CodeSpan>
        <span className={styles.label}>{resultLabel}</span>
      </div>
      <div className={styles.Cell}>
        <span>vs.</span>
      </div>
      <div className={styles.Cell}>
        <CodeSpan className={styles.resultValue}>{skillLevel}</CodeSpan>
        <span className={styles.label}>{vsLabel}</span>
      </div>
    </div>
  );
}

export default ResultVsSkillRow;
