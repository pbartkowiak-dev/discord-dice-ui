import React from "react";
import { connect } from "react-redux";
import { hideMsg } from "../../actions/modals";
import { requestReroll } from "../../actions/roll.actions";
import Reroll from "./Reroll";

const mapDispatchToProps = {
  hideMsg,
  requestReroll,
};

interface Props {
  complicationThreshold?: number;
  isPool?: boolean;
  isFate?: boolean;
  results: number[];
  requestReroll: any;
  hideMsg: () => void;
}

function RerollContainer({
  hideMsg,
  results,
  requestReroll,
  isPool,
  isFate,
  complicationThreshold,
}: Props) {
  const handleReroll = (itemsToStay?: Array<number>) => {
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
      complicationThreshold={complicationThreshold}
      results={results}
      isPool={isPool}
      isFate={isFate}
    />
  );
}

export default connect(undefined, mapDispatchToProps)(RerollContainer);
