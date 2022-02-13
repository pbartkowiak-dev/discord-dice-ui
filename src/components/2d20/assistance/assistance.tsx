import React, { FC, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import tooltip from "../../../locale/tooltip";
import DiceRow from "../dice-row/dice-row";
import { Field } from "redux-form";
import { assistanceFocusLabel, assistanceTnLabel } from "../form-2d20/labels";
import { renderInput } from "../form-2d20/form-utils";

interface Props {
  assistanceDice: string;
  tn: string;
  focus: string;
  change: (name: string, value: string) => void;
  className?: string;
}

export const Assistance: FC<Props> = ({
  assistanceDice,
  tn,
  focus,
  change,
  className,
}) => {
  const [assistanceHover, setAssistanceHover] = useState(0);

  const handleAssistanceDiceChange = (diceAmount: string) => {
    change("assistanceDice", diceAmount);
  };

  return (
    <div className={className}>
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle className="assistance-title--container" eventKey="1">
          <h5 className="assistance-title">
            Assistance <InfoTooltip content={tooltip.assistanceInfo} />
          </h5>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <>
            <div className="flex-center">
              <div className="conan-radio-fields conan-radio-fields--dice-to-roll conan-radio-fields--assistance">
                <DiceRow
                  dice={assistanceDice}
                  diceMax={4}
                  fortune={0}
                  hoverState={assistanceHover}
                  handleOnHover={setAssistanceHover}
                  handleOnClick={handleAssistanceDiceChange}
                  isAssistance={true}
                />
              </div>
            </div>
            <div className="skill-level-field conan-skill-level-field conan-skill-level-field--assistance">
              <div className="conan-field">
                <Field
                  id="assistanceFocus"
                  name="assistanceFocus"
                  label={assistanceFocusLabel}
                  placeholder={focus}
                  component={renderInput}
                />
              </div>
              <div className="conan-field">
                <Field
                  id="assistanceTn"
                  name="assistanceTn"
                  label={assistanceTnLabel}
                  placeholder={tn}
                  component={renderInput}
                />
              </div>
            </div>
          </>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export default Assistance;
