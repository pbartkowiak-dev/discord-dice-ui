import React, { FC } from "react";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import tooltip from "../../../locale/tooltip";
import { Field } from "redux-form";

interface Props {
  dice: string;
  change: (name: string, value: string) => void;
  className?: string;
  header?: string;
}

export const Fortune: FC<Props> = ({ dice, change, className, header }) => {
  return (
    <div className={className}>
      <h5 className="fortune-title">
        {header || "Fortune"} <InfoTooltip content={tooltip.fortuneInfo} />
      </h5>
      <div className="conan-radio-fields">
        <label className="dice-row-label">
          <Field name="fortune" component="input" type="radio" value="0" />
          None
        </label>
        <label className="dice-row-label">
          <Field
            name="fortune"
            component="input"
            type="radio"
            value="1"
            onChange={() => (Number(dice) < 3 ? change("dice", "3") : null)}
          />
          One
        </label>
        <label className="dice-row-label">
          <Field
            name="fortune"
            component="input"
            type="radio"
            value="2"
            onChange={() => (Number(dice) < 4 ? change("dice", "4") : null)}
          />
          Two
        </label>
        <label className="dice-row-label">
          <Field
            name="fortune"
            component="input"
            type="radio"
            value="3"
            onChange={() => (Number(dice) < 5 ? change("dice", "5") : null)}
          />
          Three
        </label>
      </div>
    </div>
  );
};

export default Fortune;
