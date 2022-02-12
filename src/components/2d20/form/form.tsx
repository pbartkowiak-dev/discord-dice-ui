import Form from "react-bootstrap/Form";
import React from "react";

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
