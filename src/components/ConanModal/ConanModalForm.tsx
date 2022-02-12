// @ts-nocheck
import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { Field, reduxForm, formValueSelector } from "redux-form";
import DiffLadder from "../DiffLadder/DiffLadder";
import "../2d20/form/form.css";
import DiceRow from "../2d20/dice-row/dice-row";
import { focusLabel, tnLabel, untrainedTestLabel } from "../2d20/labels";
import Fortune from "../2d20/fortune/fortune";
import { RenderCheckbox, renderInput } from "../2d20/form/form";
import Assistance from "../2d20/assistance/assistance";

function ConanModalForm({
  change,
  invalid,
  anyTouched,
  submitFailed,
  handleSubmit,
  formValues,
}: any) {
  const { focus, tn, dice, fortune, assistanceDice } = formValues;
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

  const handleAssistanceDiceChange = (diceAmount: string) => {
    change("assistanceDice", diceAmount);
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
      id="conan-mode-form"
      onSubmit={handleSubmit}
    >
      <div className="skill-level-field conan-skill-level-field">
        <div className="conan-field">
          <Field
            id="focus"
            name="focus"
            label={focusLabel}
            onChange={(evt) => handleFocusChange(evt.currentTarget.value)}
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
      <Field
        name="untrainedTest"
        id="untrainedTest"
        label={untrainedTestLabel}
        component={RenderCheckbox}
        disabled={focus && Number(focus) > 0}
      />
      <Fortune className="fortune" dice={dice} change={change} />
      <Assistance
        className="assistance"
        assistanceDice={assistanceDice}
        tn={tn}
        focus={focus}
        change={change}
      />
    </Form>
  );
}

interface ErrorPropTypes {
  tn?: string;
  focus?: string;
  assistanceFocus?: string;
  assistanceTn?: string;
}

const validate = (values: any) => {
  const errors: ErrorPropTypes = {};
  const { tn, focus, assistanceTn, assistanceFocus } = values;
  const tnNumber = parseInt(tn, 10);
  const focusNumber = parseInt(focus, 10);
  const assistanceTnNumber = parseInt(assistanceTn, 10);
  const assistanceFocusNumber = parseInt(assistanceFocus, 10);

  if (!tn || !tn.trim()) {
    errors.tn = "Target Number cannot be empty";
  }
  if (tnNumber < 0) {
    errors.tn = "Target Number must be equal or greater than 0";
  }
  if (tnNumber > 20) {
    errors.tn = "Target Number must be less than 20";
  }
  if (isNaN(tnNumber)) {
    errors.tn = "Target Number must be a valid number";
  }
  if (focus && isNaN(focusNumber)) {
    errors.focus = "Focus must be a valid number";
  }
  if (focus && focusNumber > 5) {
    errors.focus = "Focus must be less than 5";
  }
  // Assistance values
  if (assistanceFocus && isNaN(assistanceFocusNumber)) {
    errors.assistanceFocus = "Focus must be a valid number";
  }
  if (assistanceFocus && assistanceFocusNumber > 5) {
    errors.assistanceFocus = "Focus must be less than 5";
  }
  if (assistanceTn && isNaN(assistanceTnNumber)) {
    errors.assistanceTn = "TN must be a valid number";
  }
  if (assistanceTnNumber && assistanceTnNumber > 20) {
    errors.assistanceTn = "Target Number must be less than 20";
  }
  return errors;
};

const form = "ConanModalForm";

const FormElement = reduxForm({
  form,
  validate,
})(ConanModalForm);

const selector = formValueSelector(form);

export default connect((state) => ({
  formValues: selector(
    state,
    "difficulty",
    "untrainedTest",
    "focus",
    "tn",
    "dice",
    "fortune",
    "assistanceDice",
    "assistanceFocus",
    "assistanceTn"
  ),
}))(FormElement);
