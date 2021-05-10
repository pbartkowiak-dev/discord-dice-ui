import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModifierForm from './ModifierForm';
import { ModifierModalPropTypes } from './ModifierModalTypes';

function ModifierModal({
	closeModifierModal,
	requestRoll,
	showModal,
	diceSelected
}: ModifierModalPropTypes
) {
	const formName = 'modifier-form';

	const onSubmit = (modifier: string) => {
		const { diceType, diceAmount } = diceSelected;

		requestRoll({
			diceType,
			diceAmount,
			modifier: Number(modifier) || 0
		});

		closeModifierModal();
	};

	return (
		<Modal show={showModal} onHide={closeModifierModal}>
			<Modal.Header closeButton>
				<Modal.Title>Add Modifier</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ModifierForm
					onSubmit={onSubmit}
					formName={formName}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModifierModal}>
					Cancel
				</Button>
				<Button variant="success" type="submit" form={formName}>
					Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModifierModal;
