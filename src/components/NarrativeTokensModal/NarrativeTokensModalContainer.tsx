import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { updateNarrativeTokensState } from "../../actions/narrativeDice.actions";
import { TokensModal, TokensState } from "../tokens-modal/tokens-modal";

const mapStateToProps = (state: any) => {
  const { narrativeDiceData } = state;
  return {
    narrativeDiceData,
  };
};

const mapDispatchToProps = {
  updateNarrativeTokensState,
  hideMsg,
};

function NarrativeTokensModalContainer({
  updateNarrativeTokensState,
  hideMsg,
  narrativeDiceData: { showTokensModal, destinyLight, destinyDark },
}: any) {
  const handleUpdateTokens = (tokensState: TokensState) => {
    const { tokenOneState, tokenTwoState } = tokensState;

    updateNarrativeTokensState({
      destinyDark: tokenOneState,
      destinyLight: tokenTwoState,
    });
  };

  return (
    <TokensModal
      showModal={showTokensModal}
      hideMsg={hideMsg}
      handleUpdateTokens={handleUpdateTokens}
      tokenOne={{
        name: "Dark Destiny Points",
        initialValue: destinyDark,
        img: "destiny_dark.png",
        min: 0,
        max: 30,
      }}
      tokenTwo={{
        name: "Light Destiny Points",
        initialValue: destinyLight,
        img: "destiny_light.png",
        min: 0,
        max: 30,
      }}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NarrativeTokensModalContainer);
