import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { updateTokensState } from "../../actions/conan.actions";
import { TokensModal, TokensState } from "../tokens-modal/tokens-modal";

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
  const handleUpdateTokens = (tokensState: TokensState) => {
    const { tokenOneState, tokenTwoState } = tokensState;

    updateTokensState({
      doom: tokenOneState,
      momentum: tokenTwoState,
    });
  };

  return (
    <TokensModal
      showModal={showTokensModal}
      hideMsg={hideMsg}
      handleUpdateTokens={handleUpdateTokens}
      tokenOne={{
        name: "Doom",
        initialValue: doom,
        img: "doom.png",
        min: 0,
        max: 30,
      }}
      tokenTwo={{
        name: "Momentum",
        initialValue: momentum,
        img: "momentum.png",
        min: 0,
        max: 6,
      }}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConanTokensModalContainer);
