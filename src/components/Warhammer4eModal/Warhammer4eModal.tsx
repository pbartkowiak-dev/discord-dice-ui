import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Warhammer4eModalForm from './Warhammer4eModalForm';
import { request } from '../../utils/request';
import getWarhammerRequestMsg from '../../utils/getWarhammerRequestMsg';
import getWarhammerLocalMsg from '../../utils/getWarhammerLocalMsg';
import rollDice from '../../utils/rollDice';

type Warhammer4eModalProps = {
	userSettings: any,
	showWarhammer4eModal: boolean,
	closeWarhammer4eModal: Function,
	showMsg: Function
}

function Warhammer4eModal({
	userSettings,
	showWarhammer4eModal,
	closeWarhammer4eModal,
	showMsg
}: Warhammer4eModalProps
) {
	const handleClose = () => {
		closeWarhammer4eModal();
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
		
		closeWarhammer4eModal();
	};

	return (
		<>
			<Modal show={showWarhammer4eModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Warhammer 4e Options</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Warhammer4eModalForm onSubmit={values => handleSubmit(values)} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="success"
						type="submit"
						form="warhammer4e-mode-form">Roll!
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Warhammer4eModal;