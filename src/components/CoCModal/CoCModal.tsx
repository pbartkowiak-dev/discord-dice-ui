import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CoCModalForm from './CoCModalForm';
import { D100_SL } from '../../consts/consts';
import { CoCFormValuesTypes, CoCModalPropTypes } from './CoCModalTypes';

function CoCModal({
	showModal,
	closeCoCModal,
	requestRoll
}: CoCModalPropTypes
) {
	const handleSubmit = (values: CoCFormValuesTypes) => {
		requestRoll({
			diceType: D100_SL,
			...values
		});
		closeCoCModal();
	};

	return (
		<Modal show={showModal} onHide={closeCoCModal}>
			<Modal.Header closeButton>
				<Modal.Title>Call of Cthulhu 7e Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CoCModalForm onSubmit={values => handleSubmit(values)} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeCoCModal}>
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

export default CoCModal;
