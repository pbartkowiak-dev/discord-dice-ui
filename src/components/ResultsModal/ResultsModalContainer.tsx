import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import ResultsModal from "./ResultsModal";
import { ResultsModalContainerPropTypes } from "./ResultsModalTypes";
import {
  D20_CONAN_TEST,
  D20_DUNE_TEST,
  D20_INFINITY_TEST,
} from "../../consts/diceConstants";
import ResultsModal2d20 from "../2d20/results-modal-2d20/results-modal-2d20";

const mapStateToProps = ({ msg, diceSelected }: any) => {
  return {
    msgData: msg,
    diceSelected,
  };
};

const mapDispatchToProps = {
  hideMsg,
};

function ResultsModalContainer({
  hideMsg,
  msgData,
  diceSelected,
}: ResultsModalContainerPropTypes) {
  const { diceType } = diceSelected;
  const is2d20 = [D20_CONAN_TEST, D20_INFINITY_TEST, D20_DUNE_TEST].includes(
    diceType
  );

  if (is2d20) {
    return (
      <ResultsModal2d20
        hideMsg={hideMsg}
        msgData={msgData}
        showModal={msgData.showMsg}
        diceSelected={diceSelected}
      />
    );
  }

  return (
    <ResultsModal
      hideMsg={hideMsg}
      msgData={msgData}
      showModal={msgData.showMsg}
      diceSelected={diceSelected}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsModalContainer);
