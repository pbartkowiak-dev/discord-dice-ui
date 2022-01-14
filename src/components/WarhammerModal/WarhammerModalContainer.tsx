import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  saveSlType,
  closeWarhammerModal,
  requestWarhammerRoll,
} from "../../actions/warhammer.actions";
import WarhammerModal from "./WarhammerModal";
import localStorageWarhammerSlModeManager from "../../utils/localStorageWarhammerSlModeManager";
import { WarhammerModalContainerPropTypes } from "./WarhammerModalTypes";
import queryParamsManager from "../../utils/queryParamsManager";
import sl, { isProperSl } from "./sl";

const mapStateToProps = ({ warhammerState }: any) => {
  return {
    slType: warhammerState.slType,
  };
};

const mapDispatchToProps = {
  closeWarhammerModal,
  saveSlType,
  requestWarhammerRoll,
};

function WarhammerModalContainer({
  showModal,
  closeWarhammerModal,
  saveSlType,
  slType,
  requestWarhammerRoll,
}: WarhammerModalContainerPropTypes) {
  useEffect(() => {
    const storedSL =
      queryParamsManager.get("sl") || localStorageWarhammerSlModeManager.load();

    if (isProperSl(storedSL)) {
      // @ts-ignore
      saveSlType(storedSL);
    } else {
      saveSlType(sl.wfrp4e);
    }
  }, [saveSlType]);

  return (
    <WarhammerModal
      closeWarhammerModal={closeWarhammerModal}
      slType={slType}
      requestWarhammerRoll={requestWarhammerRoll}
      showModal={showModal}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarhammerModalContainer);
