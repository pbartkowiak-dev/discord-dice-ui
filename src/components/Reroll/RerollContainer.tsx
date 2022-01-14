import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { requestReroll } from "../../actions/roll.actions";
import Reroll from "./Reroll";

const mapDispatchToProps = {
  hideMsg,
  requestReroll,
};

function RerollContainer({
  hideMsg,
  results,
  requestReroll,
  isPool,
  isFate,
}: any) {
  const handleReroll = (itemsToStay: Array<number>) => {
    hideMsg();
    setTimeout(() => {
      requestReroll({
        itemsToStay,
      });
    }, 500);
  };

  return (
    <Reroll
      handleReroll={handleReroll}
      results={results}
      isPool={isPool}
      isFate={isFate}
    />
  );
}

export default connect(undefined, mapDispatchToProps)(RerollContainer);
