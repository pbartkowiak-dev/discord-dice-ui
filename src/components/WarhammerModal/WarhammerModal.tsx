import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import WarhammerModalForm from './WarhammerModalForm';
import localStorageWarhammerSlModeManager from '../../utils/localStorageWarhammerSlModeManager';

interface WarhammerModalProps {
	showModal: boolean;
	closeWarhammerModal: () => void;
	warhammerSlMode: string;
	requestDiceRoll: Function
}

type WarhammerSlTypes =
	| 'fastSL'
	| 'darkHeresySL'
	| 'warhammer4eSL'
	| 'warhammer2eSL'

interface WarhammerFormValues {
	skillLevel: string;
	warhammerSlMode: WarhammerSlTypes
}


function WarhammerModal({
	showModal,
	closeWarhammerModal,
	warhammerSlMode,
	requestDiceRoll
}: WarhammerModalProps
) {
	const initialValues = {
		warhammerSlMode
	};

	const handleSubmit = (values: WarhammerFormValues) => {
		console.log('warhammer form values', values);
		requestDiceRoll({
			diceType: 100,
			...values
		});

		localStorageWarhammerSlModeManager.save(values.warhammerSlMode);

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
