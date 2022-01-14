import React from "react";
import { connect } from "react-redux";
import { closeInfinityModal } from "../../actions/modals";
import { requestRoll } from "../../actions/roll.actions";
import InfinityModal from "./InfinityModal";
import { InfinityModalPropTypes } from "./InfinityModalTypes";

const mapDispatchToProps = {
  closeInfinityModal,
  requestRoll,
};

const InfinityModalContainer = ({
  closeInfinityModal,
  showModal,
  requestRoll,
}: InfinityModalPropTypes) => (
  <InfinityModal
    closeInfinityModal={closeInfinityModal}
    showModal={showModal}
    requestRoll={requestRoll}
  />
);

export default connect(undefined, mapDispatchToProps)(InfinityModalContainer);
