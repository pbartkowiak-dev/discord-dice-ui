import React from "react";
import { connect } from "react-redux";
import {
  closeWarhammerMoneyModal,
  warhammerMoneyRecalculated,
} from "../../actions/modals";
import WarhammerMoneyModal from "./WarhammerMoneyModal";

function mapStateToProps(state: any) {
  return {
    userSettings: state.userSettings,
  };
}

const mapDispatchToProps = {
  closeWarhammerMoneyModal,
  warhammerMoneyRecalculated,
};

function WarhammerMoneyModalContainer({
  showModal,
  closeWarhammerMoneyModal,
  warhammerMoneyRecalculated,
  userSettings,
}: any) {
  const hasHookUrl = !!userSettings.hookUrl;

  return (
    <WarhammerMoneyModal
      showModal={showModal}
      closeModal={closeWarhammerMoneyModal}
      warhammerMoneyRecalculated={warhammerMoneyRecalculated}
      hasHookUrl={hasHookUrl}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarhammerMoneyModalContainer);
