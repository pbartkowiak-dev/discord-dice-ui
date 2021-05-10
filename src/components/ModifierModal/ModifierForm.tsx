import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';

function ModifierForm( { onSubmit, formName }: any) {
	const fieldRef = useRef(null);
	useEffect(() => {
		if (fieldRef.current) {
			// @ts-ignore
			fieldRef.current.focus();
		}
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// @ts-ignore
		onSubmit(fieldRef.current.value);
	};

	return (
		<Form id={formName} onSubmit={handleSubmit}>
			<Form.Group controlId={formName}>
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

export default ModifierForm;
