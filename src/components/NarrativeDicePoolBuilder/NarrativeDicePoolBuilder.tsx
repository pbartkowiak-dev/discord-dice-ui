import React from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import Button from "react-bootstrap/Button";
import PoolBuilderContainer from "../PoolBuilder/PoolBuilderContainer";
import { submitRoll } from "../../actions/roll.actions";
import { PoolType } from "../PoolBuilderModal/PoolBuilderModalTypes";
import poolBuilderStyles from "../PoolBuilder/PoolBuilder.module.css";

function NarrativeDicePoolBuilder() {
  const dispatch = useDispatch();
  const handleSubmit = (pool: PoolType) => dispatch(submitRoll({ pool }));

  const formName = "narrative-pool-builder-form";

  return (
    <div
      className={classNames({
        "dice-module": true,
        [poolBuilderStyles.narrativePoolBuilder]: true,
      })}
    >
      <PoolBuilderContainer
        handleSubmit={handleSubmit}
        formName={formName}
        maxDicePool={9}
        type="narrativeDice"
      />
      <div className={poolBuilderStyles.poolBuilderBtnContainer}>
        <Button size="lg" variant="success" type="submit" form={formName}>
          Roll!
        </Button>
      </div>
    </div>
  );
}

export default NarrativeDicePoolBuilder;
