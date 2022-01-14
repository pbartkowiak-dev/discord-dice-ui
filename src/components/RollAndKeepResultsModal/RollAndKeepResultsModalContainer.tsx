import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import {
  keepDice,
  requestRollAndKeepReroll,
} from "../../actions/rollAndKeep.actions";
import RollAndKeepResultsModal from "./RollAndKeepResultsModal";

const mapStateToProps = (state: any) => {
  const { rollAndKeepData, rerollCount } = state;
  return {
    rollAndKeepData,
    rerollCount,
  };
};

const mapDispatchToProps = {
  hideMsg,
  requestRollAndKeepReroll,
  keepDice,
};

function RollAndKeepResultsModalContainer({
  hideMsg,
  rollAndKeepData: { showModal, results, modifier },
  rerollCount,
  requestRollAndKeepReroll,
  keepDice,
}: any) {
  return (
    <RollAndKeepResultsModal
      showModal={showModal}
      hideMsg={hideMsg}
      rerollCount={rerollCount}
      keepDice={keepDice}
      requestRollAndKeepReroll={requestRollAndKeepReroll}
      results={results}
      modifier={modifier}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RollAndKeepResultsModalContainer);
