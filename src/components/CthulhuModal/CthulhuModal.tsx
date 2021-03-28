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

	return (
		<Modal show={showModal} onHide={closeCthulhuModal}>
			<Modal.Header closeButton>
				<Modal.Title>Call of Cthulhu 7e Roll Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CthulhuModalForm onSubmit={values => handleSubmit(values)} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeCthulhuModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					form="coc-mode-form">Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CthulhuModal;
