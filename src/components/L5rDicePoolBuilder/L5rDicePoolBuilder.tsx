import React from "react";
import classNames from "classnames";
import Button from "react-bootstrap/Button";
import PoolBuilderContainer from "../PoolBuilder/PoolBuilderContainer";
import { PoolType } from "../PoolBuilderModal/PoolBuilderModalTypes";
import { submitRoll } from "../../actions/roll.actions";
import l5rStyles from "../L5rResultsModal/L5rResultsModal.module.css";
import poolBuilderStyles from "../PoolBuilder/PoolBuilder.module.css";
import { useDispatch } from "react-redux";

function L5rDicePoolBuilder() {
  const dispatch = useDispatch();

  const handleSubmit = (pool: PoolType) => {
    dispatch(submitRoll({ pool }));
  };

  const formName = "l5r-pool-builder-form";
  const maxDicePool = 9;

  return (
    <div
      className={classNames({
        "dice-module": true,
        [l5rStyles.poolBuilder]: true,
      })}
    >
      <PoolBuilderContainer
        handleSubmit={handleSubmit}
        formName={formName}
        maxDicePool={maxDicePool}
        type="l5rMode"
      />
      <div className={poolBuilderStyles.poolBuilderBtnContainer}>
        <Button size="lg" variant="success" type="submit" form={formName}>
          Roll!
        </Button>
      </div>
    </div>
  );
}

export default L5rDicePoolBuilder;
