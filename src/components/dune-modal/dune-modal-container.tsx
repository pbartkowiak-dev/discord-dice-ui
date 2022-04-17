import React from "react";
import { connect } from "react-redux";
import { closeDuneModal } from "../../actions/modals";
import { requestRoll } from "../../actions/roll.actions";
import DuneModal from "./dune-modal";
import { DuneModalPropTypes } from "./dune-modal-types";

const mapDispatchToProps = {
  closeDuneModal,
  requestRoll,
};

const DuneModalContainer = ({
  closeDuneModal,
  showModal,
  requestRoll,
}: DuneModalPropTypes) => (
  <DuneModal
    closeDuneModal={closeDuneModal}
    showModal={showModal}
    requestRoll={requestRoll}
  />
);

export default connect(undefined, mapDispatchToProps)(DuneModalContainer);
