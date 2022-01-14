import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { DISCORD_WEBHOOK_URL } from "../../consts/urls";
import Button from "react-bootstrap/Button";

const createRenderer =
  (render: any) =>
  (
    // @ts-ignore
    { input, label, id, textMuted, meta, placeholder, onButtonClick },
    // @ts-ignore
    ...rest
  ) => {
    return (
      <>
        {render(
          input,
          label,
          id,
          textMuted,
          meta,
          placeholder,
          onButtonClick,
          rest
        )}
      </>
    );
  };

const renderInput = createRenderer(
  // @ts-ignore
  (input, label, id, textMuted, meta, placeholder, onButtonClick) => {
    const { submitFailed, touched, error } = meta;
    const hasError = !!((submitFailed || touched) && error);

    return (
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={placeholder}
            isInvalid={hasError}
            {...input}
          />
          {id === "hookUrl" && (
            <InputGroup.Append>
              <Button onClick={onButtonClick} variant="outline-secondary">
                <FontAwesomeIcon icon={faCopy} /> Copy App Link
              </Button>
            </InputGroup.Append>
          )}
        </InputGroup>
        {hasError && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
        {textMuted && <Form.Text className="text-muted">{textMuted}</Form.Text>}
      </Form.Group>
    );
  }
);

function UserSettingsForm({ handleSubmit, hookUrl }: any) {
  const webhookPlaceholder = DISCORD_WEBHOOK_URL + "xxxxxxxxx";
  const webhookLinkSeparator = "webhooks/";

  const getAppLink = () => {
    if (hookUrl && hookUrl.includes(webhookLinkSeparator)) {
      const el = document.createElement("input");
      const webhookCode = hookUrl.split(webhookLinkSeparator).pop();
      el.value = document.location.origin + "/?q=" + webhookCode;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  return (
    <Form id="user-settings-form" onSubmit={handleSubmit}>
      <Field
        id="hookUrl"
        name="hookUrl"
        label="Discord Webhook url address:"
        placeholder={webhookPlaceholder}
        textMuted="Ask your Discord channel administrator"
        component={renderInput}
        onButtonClick={getAppLink}
      />
      <Field
        id="username"
        name="username"
        label="Username:"
        placeholder="Your username"
        component={renderInput}
        required
      />
    </Form>
  );
}

type errorsProps = {
  username?: string;
};

const validate = (values: any) => {
  const errors: errorsProps = {};
  const { username } = values;
  if (!username || !username.trim()) {
    errors.username = "Username cannot be empty";
  }
  return errors;
};

const form = "userSettingsForm";

const FormElement = reduxForm({
  form,
  validate,
})(UserSettingsForm);

const selector = formValueSelector(form);

export default connect((state) => ({
  hookUrl: selector(state, "hookUrl"),
}))(FormElement);
