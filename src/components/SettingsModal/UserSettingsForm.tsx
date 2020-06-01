import React from 'react';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm } from 'redux-form';
import { DISCORD_WEBHOOK_URL } from '../../consts/urls' ;

// @ts-ignore
const createRenderer = render => ({ input, label, id, textMuted, meta, placeholder }, ...rest) => {
	return (
		<>
			{render(input, label, id, textMuted, meta, placeholder, rest)}
		</>
	)
};

// @ts-ignore
const renderInput = createRenderer((input, label, id, textMuted, meta, placeholder) => {
	const { submitFailed, touched, error } = meta;
	const hasError = !!((submitFailed || touched) && error);
	return (
		<Form.Group controlId={id}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type="text"
				placeholder={placeholder}
				isInvalid ={hasError}
				{...input}
			/>
			{ hasError && <Form.Control.Feedback type="invalid">{ error }</Form.Control.Feedback> }
			{ textMuted && <Form.Text className="text-muted">{ textMuted }</Form.Text> }
		</Form.Group>
	);
});

function UserSettingsForm({ handleSubmit, pristine, reset, submitting }: any) {
	const webhookPlaceholder = DISCORD_WEBHOOK_URL + 'xxxxxxxxx';

	return (
		<Form id="user-settings-form"
			onSubmit={handleSubmit}>
			<Field
				id="hookUrl"
				name="hookUrl"
				label="Discord Webhook url address:"
				placeholder={webhookPlaceholder}
				textMuted="Ask your Discord channel administrator"
				component={renderInput}
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
	username?: string
}

const validate = (values:any) => {
	const errors:errorsProps = {}
	const { username } = values;
	if (!username || !username.trim()) {
		errors.username = 'Username cannot be empty';
	}
	return errors;
}

export default reduxForm({
	form: 'userSettingsForm',
	validate
})(UserSettingsForm);