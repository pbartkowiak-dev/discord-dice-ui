import React from "react";
import { connect } from "react-redux";
import L5rResultsDropdown from "./L5rResultsDropdown";
import {
  l5rAlterDie,
  l5rRollAdditionalDie,
  l5rSendState,
} from "../../actions/l5r.actions";

const mapDispatchToProps = {
  l5rAlterDie,
  l5rRollAdditionalDie,
  l5rSendState,
};

function L5rResultsDropdownContainer(props: any) {
  return <L5rResultsDropdown {...props} />;
}

export default connect(
  undefined,
  mapDispatchToProps
)(L5rResultsDropdownContainer);
