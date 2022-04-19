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

export const TREACHEROUS = "Treacherous";
export const PRECARIOUS = "Precarious";
export const PERILOUS = "Perilous";
export const RISKY = "Risky";
export const NORMAL = "Normal";

export const getComplicationRangeName = (
  complicationRangeVal: string | number
) => {
  const value = Number(complicationRangeVal);
  switch (value) {
    case 5:
      return TREACHEROUS;
    case 4:
      return PRECARIOUS;
    case 3:
      return PERILOUS;
    case 2:
      return RISKY;
    default:
      return NORMAL;
  }
};

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
          <span>{getComplicationRangeName(value)}</span>
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
