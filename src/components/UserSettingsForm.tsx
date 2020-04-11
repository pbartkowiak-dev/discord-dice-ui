import React from 'react';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm } from 'redux-form'


function myField({input}:any) {
	return (
		<Form.Group controlId="formBasicEmail">
			<Form.Label>Discord hook url address</Form.Label>
			<Form.Control type="text" placeholder="Enter Hook Url" {...input} />
			<Form.Text className="text-muted">Ask your Discord channel administrator</Form.Text>
		</Form.Group>
	);
}

function myField2({input}:any) {
	return (
		<Form.Group controlId="formBasicPassword">
			<Form.Label>Username</Form.Label>
			<Form.Control type="text" placeholder="Enter your username" {...input} />
		</Form.Group>
	);
}

function UserSettingsForm(props:any) {
	const { handleSubmit, pristine, reset, submitting } = props

	return (
		<Form id="user-settings-form"
			onSubmit={handleSubmit}>
			<Field
				name="hookUrl"
				component={myField}
			/>
			<Field
				name="username"
				component={myField2}
			/>
		</Form>
	);
}

export default reduxForm({
	form: 'userSettingsForm'
})(UserSettingsForm)