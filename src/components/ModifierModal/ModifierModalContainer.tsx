import React from "react";
import { connect } from "react-redux";
import { closeModifierModal, showMsgModal } from "../../actions/modals";
import { requestRoll } from "../../actions/roll.actions";
import ModifierModal from "./ModifierModal";
import { ModifierModalPropTypes } from "./ModifierModalTypes";

const mapStateToProps = (state: any) => {
  return {
    diceSelected: state.diceSelected,
  };
};

const mapDispatchToProps = {
  closeModifierModal,
  requestRoll,
  showMsgModal,
};

function ModifierModalContainer({
  closeModifierModal,
  requestRoll,
  diceSelected,
  showModal,
}: ModifierModalPropTypes) {
  return (
    <ModifierModal
      closeModifierModal={closeModifierModal}
      requestRoll={requestRoll}
      diceSelected={diceSelected}
      showModal={showModal}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifierModalContainer);
