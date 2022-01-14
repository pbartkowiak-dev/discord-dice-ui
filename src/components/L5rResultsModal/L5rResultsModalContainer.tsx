import React from "react";
import { connect } from "react-redux";
import { getResultsDerivedSelector } from "../../selectors/l5rSelectors";
import { hideMsg } from "../../actions/modals";
import {
  requestL5rReroll,
  l5rKeepDice,
  l5rClearData,
  l5rSendState,
} from "../../actions/l5r.actions";
import L5rResultsModal from "./L5rResultsModal";
import { L5rResultsModalContainerPropTypes } from "./L5rResultsModalTypes";

const mapStateToProps = (state: any) => {
  const { l5rData, rerollCount } = state;
  return {
    l5rData,
    rerollCount,
    resultsDerived: getResultsDerivedSelector(state),
  };
};

const mapDispatchToProps = {
  hideMsg,
  requestL5rReroll,
  l5rKeepDice,
  l5rClearData,
  l5rSendState,
};

function L5rResultsModalContainer({
  hideMsg,
  l5rData: {
    showModal,
    results,
    resultsKept,
    resultsKeptIndexesAltered,
    resultsKeptIndexesExploded,
    additionalDiceRolled,
    additionalDiceIndexesKept,
    additionalDiceIndexesDropped,
    additionalDiceIndexesExploded,
  },
  rerollCount,
  requestL5rReroll,
  l5rKeepDice,
  l5rClearData,
  l5rSendState,
  resultsDerived,
}: L5rResultsModalContainerPropTypes) {
  return (
    <L5rResultsModal
      hideMsg={hideMsg}
      rerollCount={rerollCount}
      l5rKeepDice={l5rKeepDice}
      requestL5rReroll={requestL5rReroll}
      l5rClearData={l5rClearData}
      l5rSendState={l5rSendState}
      showModal={showModal}
      results={results}
      resultsKept={resultsKept}
      resultsKeptIndexesAltered={resultsKeptIndexesAltered}
      resultsKeptIndexesExploded={resultsKeptIndexesExploded}
      resultsDerived={resultsDerived}
      additionalDiceRolled={additionalDiceRolled}
      additionalDiceIndexesKept={additionalDiceIndexesKept}
      additionalDiceIndexesDropped={additionalDiceIndexesDropped}
      additionalDiceIndexesExploded={additionalDiceIndexesExploded}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(L5rResultsModalContainer);
