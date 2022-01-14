import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { updateTokensState } from "../../actions/conan.actions";
import ConanTokensModal from "./ConanTokensModal";

const mapStateToProps = (state: any) => {
  const { conanData } = state;
  return {
    conanData,
  };
};

const mapDispatchToProps = {
  updateTokensState,
  hideMsg,
};

function ConanTokensModalContainer({
  updateTokensState,
  hideMsg,
  conanData: { showTokensModal, momentum, doom },
}: any) {
  return (
    <ConanTokensModal
      updateTokensState={updateTokensState}
      showModal={showTokensModal}
      hideMsg={hideMsg}
      momentum={momentum}
      doom={doom}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConanTokensModalContainer);
