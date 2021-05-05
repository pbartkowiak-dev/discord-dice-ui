import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm } from 'redux-form';

function ModifierForm( { handleSubmit, formName }:any) {
	const fieldRef = useRef(null);
	useEffect(() => {
		if (fieldRef.current) {
			// @ts-ignore
			fieldRef.current.focus();
		}
	});

	return (
		<Form id={formName} onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicPassword">
				<Form.Label>Enter Modifier value:</Form.Label>
				<Form.Control
					type="text"
					placeholder="Modifier"
					name="modifier"
					ref={fieldRef}
				/>
			</Form.Group>
		</Form>
	);
}

export default reduxForm({
	form: 'ModifierForm'
})(ModifierForm);
