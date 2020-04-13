import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModifierForm from './ModifierForm';
import { request } from '../utils/request';
import getMsgParams from '../utils/getMsgParams';

type ModifierModalProps = {
	userSettings: any,
	rollOptions: any,
	showModifierModal: boolean,
	closeModifierModal: Function,
	selectedDice: any
}

function ModifierModal({
	userSettings,
	rollOptions,
	showModifierModal,
	closeModifierModal,
	selectedDice
}: ModifierModalProps
) {
	const handleClose = () => {
		closeModifierModal();
	};

	const handleSubmit = (values:any) => {
		const msgParams = getMsgParams({
			diceType: selectedDice.diceType,
			diceAmount: selectedDice.diceAmount,
			modifier: Number(values.modifier),
			rollOptions,
			userSettings
		});
		request(msgParams);
		closeModifierModal();
	};

	return (
		<>
			<Modal show={showModifierModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Modifier</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<ModifierForm onSubmit={values => handleSubmit(values)} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" type="submit" form="modifier-form">
						Roll!
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModifierModal;