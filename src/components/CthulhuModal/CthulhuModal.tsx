// @ts-nocheck
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CthulhuModalForm from './CthulhuModalForm';
import { CthulhuFormValuesTypes, CthulhuModalPropTypes } from './CthulhuModalTypes';

function CthulhuModal({
	showModal,
	closeCthulhuModal,
	requestCthulhuRoll
}: CthulhuModalPropTypes
) {
	const handleSubmit = (values: CthulhuFormValuesTypes) => {
		requestCthulhuRoll({
			...values,
			skillLevel: Number(values.skillLevel)
		});
		closeCthulhuModal();
	};

	const formId = 'cthulhu-mode-form';

	return (
		<Modal show={showModal} onHide={closeCthulhuModal}>
			<Modal.Header closeButton>
				<Modal.Title>Call of Cthulhu 7e Roll Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CthulhuModalForm
					onSubmit={values => handleSubmit(values)}
					formId={formId}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeCthulhuModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					form={formId}>Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CthulhuModal;
