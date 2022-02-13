import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import tooltip from "../../../locale/tooltip";
import React from "react";

export const focusLabel = (
  <span>
    Foc <InfoTooltip placement="bottom" content={tooltip.focusInfo} />
  </span>
);

export const tnLabel = (
  <span>
    TN <InfoTooltip placement="bottom" content={tooltip.tnInfo} />
  </span>
);

export const untrainedTestLabel = (
  <span>
    Untrained Test{" "}
    <InfoTooltip placement="bottom" content={tooltip.untrainedTestInfo} />
  </span>
);

export const assistanceFocusLabel = (
  <span>
    Foc <InfoTooltip placement="bottom" content={tooltip.assistanceFocusInfo} />
  </span>
);

export const assistanceTnLabel = (
  <span>
    TN <InfoTooltip placement="bottom" content={tooltip.assistanceFocusInfo} />
  </span>
);
