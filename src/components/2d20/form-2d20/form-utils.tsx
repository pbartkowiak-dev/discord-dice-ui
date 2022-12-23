import Form from "react-bootstrap/Form";
import React from "react";
import { DEFAULT_MAX_FOCUS } from "./const";

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

export const renderInput = createRenderer(
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

export const RenderCheckbox = createRenderer(
  // @ts-ignore
  (input, label, id, textMuted, meta, disabled) => {
    return (
      <Form.Check
        type="checkbox"
        checked={!!input.value}
        label={label}
        disabled={disabled}
        id={id}
        custom
        {...input}
      />
    );
  }
);

interface ErrorPropTypes {
  tn?: string;
  focus?: string;
  assistanceFocus?: string;
  assistanceTn?: string;
}

export const validate = (values: any, formData: any) => {
  const errors: ErrorPropTypes = {};
  const { tn, focus, assistanceTn, assistanceFocus } = values;
  const tnNumber = parseInt(tn, 10);
  const focusNumber = parseInt(focus, 10);
  const assistanceTnNumber = parseInt(assistanceTn, 10);
  const assistanceFocusNumber = parseInt(assistanceFocus, 10);
  const maxFocus = formData?.maxFocus || DEFAULT_MAX_FOCUS;

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
  if (focus && focusNumber > maxFocus) {
    errors.focus = `Focus must be less than ${maxFocus}`;
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
