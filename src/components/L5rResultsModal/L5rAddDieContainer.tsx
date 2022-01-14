import React from "react";
import { connect } from "react-redux";
import L5rAddDie from "./L5rAddDie";
import { l5rAddDie, l5rSendState } from "../../actions/l5r.actions";

const mapDispatchToProps = { l5rAddDie, l5rSendState };

function L5rAddDieContainer(props: any) {
  return <L5rAddDie {...props} />;
}

export default connect(undefined, mapDispatchToProps)(L5rAddDieContainer);
