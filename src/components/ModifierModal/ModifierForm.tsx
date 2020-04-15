import React from 'react';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm } from 'redux-form'

function EnterModifier({input}:any) {
	return (
		<Form.Group controlId="formBasicPassword">
			<Form.Label>Enter Modifier value</Form.Label>
			<Form.Control type="text" placeholder="Modifier" {...input} />
		</Form.Group>
	);
}

function ModifierForm(props:any) {
	const { handleSubmit, pristine, reset, submitting } = props

	return (
		<Form id="modifier-form"
			onSubmit={handleSubmit}>
			<Field
				name="modifier"
				component={EnterModifier}
			/>
		</Form>
	);
}

export default reduxForm({
	form: 'ModifierForm'
})(ModifierForm)