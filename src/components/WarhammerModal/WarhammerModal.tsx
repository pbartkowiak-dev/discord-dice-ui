import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import WarhammerModalForm from './WarhammerModalForm';
import { request } from '../../utils/request';
import getWarhammerRequestMsg from '../../utils/getWarhammerRequestMsg';
import getWarhammerLocalMsg from '../../utils/getWarhammerLocalMsg';
import rollDice from '../../utils/rollDice';

type WarhammerModalProps = {
	userSettings: any,
	showWarhammerModal: boolean,
	closeWarhammerModal: Function,
	showMsg: Function
}

function WarhammerModal({
	userSettings,
	showWarhammerModal,
	closeWarhammerModal,
	showMsg
}: WarhammerModalProps
) {
	const handleClose = () => {
		closeWarhammerModal();
	};

	const handleSubmit = (values:any) => {
		const rollOptions = { ...values };
		const result = rollDice({
			diceType: 100,
			rollOptions
		});
		const requestMsg = getWarhammerRequestMsg(result, rollOptions, userSettings);
		const localMsg = getWarhammerLocalMsg(result, rollOptions, userSettings);

		showMsg(localMsg);
		request(requestMsg);
		
		closeWarhammerModal();
	};

	return (
		<>
			<Modal show={showWarhammerModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Warhammer Options</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<WarhammerModalForm onSubmit={values => handleSubmit(values)} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="success"
						type="submit"
						form="warhammer-mode-form">Roll!
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default WarhammerModal;