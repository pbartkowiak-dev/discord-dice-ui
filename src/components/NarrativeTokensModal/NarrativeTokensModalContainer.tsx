import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { updateNarrativeTokensState } from "../../actions/narrativeDice.actions";
import NarrativeTokensModal from "./NarrativeTokensModal";

const mapStateToProps = (state: any) => {
  const { narrativeDiceData } = state;
  return {
    narrativeDiceData,
  };
};

const mapDispatchToProps = {
  updateNarrativeTokensState,
  hideMsg,
};

function NarrativeTokensModalContainer({
  updateNarrativeTokensState,
  hideMsg,
  narrativeDiceData: { showTokensModal, destinyLight, destinyDark },
}: any) {
  return (
    <NarrativeTokensModal
      updateNarrativeTokensState={updateNarrativeTokensState}
      showModal={showTokensModal}
      hideMsg={hideMsg}
      destinyLight={destinyLight}
      destinyDark={destinyDark}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NarrativeTokensModalContainer);
