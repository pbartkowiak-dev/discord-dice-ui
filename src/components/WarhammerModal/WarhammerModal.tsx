import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import WarhammerModalForm from './WarhammerModalForm';
import localStorageWarhammerSlModeManager from '../../utils/localStorageWarhammerSlModeManager';
import { WarhammerModalPropTypes, WarhammerFormValuesTypes } from './WarhammerModalTypes';

function WarhammerModal({
	showModal,
	closeWarhammerModal,
	slType,
	requestWarhammerRoll
}: WarhammerModalPropTypes) {
	const initialValues = {
		slType
	};

	const handleSubmit = (values: WarhammerFormValuesTypes) => {
		requestWarhammerRoll({
			...values,
			skillLevel: Number(values.skillLevel)
		});

		localStorageWarhammerSlModeManager.save(values.slType);

		closeWarhammerModal();
	};

	return (
		<Modal show={showModal} onHide={closeWarhammerModal}>
			<Modal.Header closeButton>
				<Modal.Title>Warhammer Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<WarhammerModalForm
					onSubmit={values => handleSubmit(values)}
					initialValues={initialValues}
					/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeWarhammerModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					form="warhammer-mode-form">Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WarhammerModal;
