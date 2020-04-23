import React from 'react';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm } from 'redux-form'

// @ts-ignore
const createRenderer = render => ({ input, label, id, textMuted, meta }, ...rest) => {
	return (
		<>
			{render(input, label, id, textMuted, meta, rest)}
		</>
	)
};

// @ts-ignore
const renderInput = createRenderer((input, label, id, textMuted, meta) => {
	const { submitFailed, touched, error } = meta;
	const hasError = !!((submitFailed || touched) && error);
	return (
		<Form.Group controlId={id}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type="text"
				placeholder="Enter your username"
				{...input}
				isInvalid ={hasError}
			/>
			{ hasError && <Form.Control.Feedback type="invalid">{ error }</Form.Control.Feedback> }
			{ textMuted && <Form.Text className="text-muted">{ textMuted }</Form.Text> }
		</Form.Group>
	);
});

function UserSettingsForm({ handleSubmit, pristine, reset, submitting }: any) {
	return (
		<Form id="user-settings-form"
			onSubmit={handleSubmit}>
			<Field
				id="hookUrl"
				name="hookUrl"
				label="Discord hook url address:"
				placeholder="Enter Hook Url"
				textMuted="Ask your Discord channel administrator"
				component={renderInput}
			/>
			<Field
				id="username"
				name="username"
				label="Username:"
				placeholder="Enter your username"
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
		errors.username = 'Username cannot be empty'
	}
	return errors
}

export default reduxForm({
	form: 'userSettingsForm',
	validate
})(UserSettingsForm);