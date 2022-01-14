import React from "react";
import Button from "react-bootstrap/Button";
import CodeSpan from "../CodeSpan/CodeSpan";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import classNames from "classnames";
import styles from "./CthulhuPushOptions.module.css";
import tooltip from "../../locale/tooltip";
import { useDispatch } from "react-redux";
import {
  closeCthulhuResultsModal,
  requestCthulhuPushRoll,
} from "../../actions/cthulhu.actions";
import Or from "../Or/Or";

function CthulhuPushOptions({ finalDieResult, skillLevel }: any) {
  const dispatch = useDispatch();

  const handlePushRoll = () => {
    dispatch(closeCthulhuResultsModal());

    setTimeout(() => {
      dispatch(requestCthulhuPushRoll());
    }, 500);
  };

  const luckForSuccess = Number(finalDieResult) - Number(skillLevel);
  const luckForHardSuccess =
    Number(finalDieResult) - Math.floor(Number(skillLevel) / 2);
  const luckForExtremeSuccess =
    Number(finalDieResult) - Math.floor(Number(skillLevel) / 5);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Button variant="outline-primary" onClick={handlePushRoll}>
          Push the Roll
        </Button>
        <InfoTooltip
          content={tooltip.pushInfo}
          className={styles.pushInfoIcon}
        />
      </div>

      <Or />

      {/* Luck Spends */}
      <div className={classNames([styles.row, styles.luckSpends])}>
        {!!luckForSuccess && (
          <div>
            Spend <CodeSpan>{luckForSuccess}</CodeSpan> Luck Points for{" "}
            <strong>Success</strong>
          </div>
        )}
        {!!luckForHardSuccess && (
          <div>
            Spend <CodeSpan>{luckForHardSuccess}</CodeSpan> Luck Points for{" "}
            <strong>Hard Success</strong>
          </div>
        )}
        {!!luckForExtremeSuccess && (
          <div>
            Spend <CodeSpan>{luckForExtremeSuccess}</CodeSpan> Luck Points for{" "}
            <strong>Extreme Success</strong>
          </div>
        )}
        <InfoTooltip
          content={tooltip.luckInfo}
          className={styles.pushInfoIcon}
        />
      </div>
    </div>
  );
}

export default CthulhuPushOptions;
