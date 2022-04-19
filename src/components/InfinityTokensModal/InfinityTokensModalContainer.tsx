import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { updateTokensState } from "../../actions/infinity.actions";
import { TokensModal, TokensState } from "../tokens-modal/tokens-modal";

const mapStateToProps = (state: any) => {
  const { infinityData } = state;
  return {
    infinityData,
  };
};

const mapDispatchToProps = {
  updateTokensState,
  hideMsg,
};

function InfinityTokensModalContainer({
  updateTokensState,
  hideMsg,
  infinityData: { showTokensModal, momentum, heat },
}: any) {
  const handleUpdateTokens = (tokensState: TokensState) => {
    const { tokenOneState, tokenTwoState } = tokensState;

    updateTokensState({
      heat: tokenOneState,
      momentum: tokenTwoState,
    });
  };

  return (
    <TokensModal
      showModal={showTokensModal}
      hideMsg={hideMsg}
      handleUpdateTokens={handleUpdateTokens}
      tokenOne={{
        name: "Heat",
        initialValue: heat,
        img: "infinity_heat.png",
        min: 0,
        max: 30,
      }}
      tokenTwo={{
        name: "Momentum",
        initialValue: momentum,
        img: "infinity_momentum.png",
        min: 0,
        max: 6,
      }}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfinityTokensModalContainer);
