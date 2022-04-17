import React, { FC } from "react";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import tooltip from "../../../locale/tooltip";
import InputRange from "../../InputRange/InputRange";
import classNames from "classnames";

interface Props {
  change: (name: string, value: string) => void;
  value: string;
}

interface LabelProps {
  onClick: (value: string) => void;
  isActive: boolean;
  value: string;
}

const Label: FC<LabelProps> = ({ onClick, isActive, value }) => {
  return (
    <label
      onClick={() => onClick(value)}
      className={classNames({
        "complication-range-label": true,
        "complication-range-label--active": isActive,
      })}
    >
      {value}
    </label>
  );
};

export const ComplicationRange: FC<Props> = ({ change, value }) => {
  const id = "dune-complication-range";

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    change("complicationRange", event.target.value);

    const skillRange = document.getElementById(id) as HTMLInputElement;
    if (skillRange) skillRange.value = event.target.value;
  };

  const changeRange = (value: string) => {
    change("complicationRange", value);
    const skillRange = document.getElementById(id) as HTMLInputElement;
    if (skillRange) skillRange.value = value;
  };

  return (
    <div className="complication-range">
      <h5 className="complication-range-title">
        Complication Range{" "}
        <InfoTooltip
          containerClassName={"range-tooltip"}
          content={tooltip.complicationRange}
        />
      </h5>
      <div className="complication-range-input-container">
        <div className="complication-range-description">
          {value === "1" && <span>Normal</span>}
          {value === "2" && <span>Risky</span>}
          {value === "3" && <span>Perilous</span>}
          {value === "4" && <span>Precarious</span>}
          {value === "5" && <span>Treacherous</span>}
        </div>
        <InputRange
          id={id}
          onChange={handleRangeChange}
          hidePercent={true}
          min={1}
          max={5}
          value={Number(value)}
        />
        <div className="complication-range-input-legend">
          <Label onClick={changeRange} isActive={value === "1"} value={"1"} />
          <Label onClick={changeRange} isActive={value === "2"} value={"2"} />
          <Label onClick={changeRange} isActive={value === "3"} value={"3"} />
          <Label onClick={changeRange} isActive={value === "4"} value={"4"} />
          <Label onClick={changeRange} isActive={value === "5"} value={"5"} />
        </div>
      </div>
    </div>
  );
};
