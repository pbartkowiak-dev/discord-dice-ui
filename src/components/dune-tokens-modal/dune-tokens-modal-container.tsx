import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { updateTokensState } from "../../actions/dune.actions";
import { TokensModal, TokensState } from "../tokens-modal/tokens-modal";

const mapStateToProps = (state: any) => {
  const { duneData } = state;
  return {
    duneData,
  };
};

const mapDispatchToProps = {
  updateTokensState,
  hideMsg,
};

const DuneTokensModalContainer = ({
  updateTokensState,
  hideMsg,
  duneData: { showTokensModal, momentum, threat },
}: any) => {
  const handleUpdateTokens = (tokensState: TokensState) => {
    const { tokenOneState, tokenTwoState } = tokensState;

    updateTokensState({
      threat: tokenOneState,
      momentum: tokenTwoState,
    });
  };

  return (
    <TokensModal
      showModal={showTokensModal}
      hideMsg={hideMsg}
      handleUpdateTokens={handleUpdateTokens}
      tokenOne={{
        name: "Threat",
        initialValue: threat,
        img: "dune_threat.png",
        min: 0,
        max: 30,
      }}
      tokenTwo={{
        name: "Momentum",
        initialValue: momentum,
        img: "dune_momentum.png",
        min: 0,
        max: 6,
      }}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuneTokensModalContainer);
