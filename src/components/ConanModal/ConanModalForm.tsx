// @ts-nocheck
import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { Field, reduxForm, formValueSelector } from "redux-form";
import DiffLadder from "../DiffLadder/DiffLadder";
import ConanDiceRow from "./ConanDiceRow";
import "./ConanModalForm.css";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import tooltip from "../../locale/tooltip";
import Accordion from "react-bootstrap/Accordion";

const createRenderer =
  (render: any) =>
  // @ts-ignore
  ({ input, label, id, textMuted, meta, disabled, placeholder }, ...rest) => {
    return (
      <>
        {render(input, label, id, textMuted, meta, disabled, placeholder, rest)}
      </>
    );
  };

const renderInput = createRenderer(
  // @ts-ignore
  (input, label, id, textMuted, meta, disabled, placeholder) => {
    const { submitFailed, touched, error } = meta;
    const hasError = !!((submitFailed || touched) && error);

    return (
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          placeholder={placeholder || "0"}
          autoComplete="off"
          isInvalid={hasError}
          {...input}
        />
        {hasError && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
        {textMuted && <Form.Text className="text-muted">{textMuted}</Form.Text>}
      </Form.Group>
    );
  }
);

const RenderCheckbox = createRenderer(
  // @ts-ignore
  (input, label, id, textMuted, meta, disabled) => {
    return (
      <Form.Check
        type="checkbox"
        checked={input.value ? true : false}
        label={label}
        disabled={disabled}
        id={id}
        custom
        {...input}
      />
    );
  }
);

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
  const [assistanceHover, setAssistanceHover] = useState(0);

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

  const focusLabel = (
    <span>
      Foc <InfoTooltip placement="bottom" content={tooltip.focusInfo} />
    </span>
  );
  const tnLabel = (
    <span>
      TN <InfoTooltip placement="bottom" content={tooltip.tnInfo} />
    </span>
  );
  const untrainedTestLabel = (
    <span>
      Untrained Test{" "}
      <InfoTooltip placement="bottom" content={tooltip.untrainedTestInfo} />
    </span>
  );

  const assistanceFocusLabel = (
    <span>
      Foc{" "}
      <InfoTooltip placement="bottom" content={tooltip.assistanceFocusInfo} />
    </span>
  );
  const assistanceTnLabel = (
    <span>
      TN{" "}
      <InfoTooltip placement="bottom" content={tooltip.assistanceFocusInfo} />
    </span>
  );

  return (
    <Form
      className={invalid && (submitFailed || anyTouched) ? "form-invalid" : ""}
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
          <ConanDiceRow
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
      <div className="fortune">
        <h5 className="fortune-title">
          Fortune <InfoTooltip content={tooltip.fortuneInfo} />
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
      <div className="assistance">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle
            className="assistance-title--container"
            eventKey="1"
          >
            <h5 className="assistance-title">
              Assistance <InfoTooltip content={tooltip.assistanceInfo} />
            </h5>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <>
              <div className="flex-center">
                <div className="conan-radio-fields conan-radio-fields--dice-to-roll conan-radio-fields--assistance">
                  <ConanDiceRow
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
