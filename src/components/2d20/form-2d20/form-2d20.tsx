import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Field } from "redux-form";
import "../form-2d20/form-2d20.css";
import DiceRow from "../dice-row/dice-row";
import { focusLabel, tnLabel, untrainedTestLabel } from "./labels";
import Fortune from "../fortune/fortune";
import Assistance from "../assistance/assistance";
import { RenderCheckbox, renderInput } from "./form-utils";
import classNames from "classnames";
import DiffLadder from "../DiffLadder/DiffLadder";
import { ComplicationRange } from "../complication-range/complication-range";

interface Props {
  formId: string;
  change: any;
  invalid: boolean;
  anyTouched: boolean;
  submitFailed: boolean;
  handleSubmit: any;
  formValues: any;
  fortuneHeader?: string;
  showUntrainedTest: boolean;
  showAssistance: boolean;
  showComplicationRange: boolean;
  maxFocus?: number;
}

export const Form2d20 = ({
  formId,
  change,
  invalid,
  anyTouched,
  submitFailed,
  handleSubmit,
  formValues,
  fortuneHeader,
  showAssistance,
  showUntrainedTest,
  showComplicationRange,
}: Props) => {
  const { focus, tn, dice, fortune, assistanceDice, complicationRange } =
    formValues;
  const [hoverState, setHoverState] = useState(0);

  const handleDiceChange = (diceAmount: string) => {
    change("dice", diceAmount);

    if (fortune === "3") {
      if (diceAmount === "4") {
        change("fortune", "2");
      } else if (diceAmount === "3") {
        change("fortune", "1");
      } else if (diceAmount === "2" || diceAmount === "1") {
        change("fortune", "0");
      }
    } else if (fortune === "2") {
      if (diceAmount === "3") {
        change("fortune", "1");
      } else if (diceAmount === "2" || diceAmount === "1") {
        change("fortune", "0");
      }
    } else if (fortune === "1") {
      if (diceAmount === "2" || diceAmount === "1") {
        change("fortune", "0");
      }
    }
  };

  const handleFocusChange = (focusValue: string) => {
    if (focusValue) {
      const focusNum = Number(focusValue);
      if (focusNum > 0) {
        change("untrainedTest", false);
      }
    }
  };

  return (
    <Form
      className={classNames({
        "conan-mode-form": true,
        "form-invalid": invalid && (submitFailed || anyTouched),
      })}
      id={formId}
      onSubmit={handleSubmit}
    >
      <div className="skill-level-field conan-skill-level-field">
        <div className="conan-field">
          <Field
            id="focus"
            name="focus"
            label={focusLabel}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleFocusChange(evt.currentTarget.value)
            }
            /* @ts-ignore */
            component={renderInput}
          />
        </div>
        <div className="conan-field">
          <Field id="tn" name="tn" label={tnLabel} component={renderInput} />
        </div>
      </div>
      <div className="skill-level-field conan-skill-level-field">
        <Field id="difficulty" name="difficulty" component={DiffLadder} />
      </div>
      <div className="flex-center">
        <div className="conan-radio-fields conan-radio-fields--dice-to-roll">
          <DiceRow
            dice={dice}
            diceMax={5}
            fortune={fortune}
            hoverState={hoverState}
            handleOnHover={setHoverState}
            handleOnClick={handleDiceChange}
            isAssistance={false}
          />
        </div>
      </div>
      {showUntrainedTest && (
        <Field
          name="untrainedTest"
          id="untrainedTest"
          label={untrainedTestLabel}
          component={RenderCheckbox}
          disabled={focus && Number(focus) > 0}
        />
      )}
      {showComplicationRange && (
        <ComplicationRange change={change} value={complicationRange} />
      )}
      <Fortune
        className="fortune"
        dice={dice}
        change={change}
        header={fortuneHeader}
      />
      {showAssistance && (
        <Assistance
          className="assistance"
          assistanceDice={assistanceDice}
          tn={tn}
          focus={focus}
          change={change}
        />
      )}
    </Form>
  );
};
