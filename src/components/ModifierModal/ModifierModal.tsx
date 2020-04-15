import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModifierForm from './ModifierForm';
import { request } from '../../utils/request';
import getMsgParams from '../../utils/getMsgParams';
import getLocalMsgParams from '../../utils/getLocalMsgParams';
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
		// @TODO ADD KEEPUNITS
		const keepUnits = false;
		const { diceType, diceAmount } = selectedDice;
		const result = rollDice(diceType, diceAmount, keepUnits);
		const msgParams = getMsgParams({
			diceType,
			modifier: Number(values.modifier),
			rollOptions,
			userSettings,
			result
		});
		const localMsgParams = getLocalMsgParams({
			fields: msgParams.fields,
			modifier: msgParams.description,
			diceType: selectedDice.diceType,
			result
		});
		showMsg(localMsgParams);
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