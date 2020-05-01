import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModifierForm from './ModifierForm';
import { request } from '../../utils/request';
import getRequestMsg from '../../utils/getRequestMsg';
import getLocalMsg from '../../utils/getLocalMsg';
import rollDice from '../../utils/rollDice';

type ModifierModalProps = {
	userSettings: any,
	rollOptions: any,
	showModifierModal: boolean,
	closeModifierModal: Function,
	showMsg: Function,
	selectedDice: any
}

function ModifierModal({
	userSettings,
	rollOptions,
	showModifierModal,
	closeModifierModal,
	showMsg,
	selectedDice
}: ModifierModalProps
) {
	const handleClose = () => {
		closeModifierModal();
	};

	const handleSubmit = (values:any) => {
		const { diceType, diceAmount } = selectedDice;
		const modifier = values.modifier ? Number(values.modifier) : 0; 
		const result = rollDice({
			diceType,
			diceAmount,
			rollOptions,
			modifier
		});
		const requestMsg = getRequestMsg(result, rollOptions, userSettings);
		const localMsg = getLocalMsg(result, rollOptions);

		showMsg(localMsg);
		request(requestMsg);
		
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
					<Button variant="success" type="submit" form="modifier-form">
						Roll!
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModifierModal;