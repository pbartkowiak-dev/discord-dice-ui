import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CoCModalForm from './CoCModalForm';
import { request } from '../../utils/request';
import getRequestMsg from '../../utils/getRequestMsg';
import getLocalCoCMsg from '../../utils/getLocalCoCMsg';
import rollDice from '../../utils/rollDice';

type CoCModalProps = {
	userSettings: any,
	showCoCModal: boolean,
	closeCoCModal: Function,
	showMsg: Function
}

function CoCModal({
	userSettings,
	showCoCModal,
	closeCoCModal,
	showMsg
}: CoCModalProps
) {
	const handleClose = () => {
		closeCoCModal();
	};

	const handleSubmit = (values:any) => {
		const rollOptions = { ...values };
		const result = rollDice({
			diceType: 100,
			rollOptions
		});
		const requestMsg = getRequestMsg(result, rollOptions, userSettings);
		const localMsg = getLocalCoCMsg(result, rollOptions);

		showMsg(localMsg);
		request(requestMsg);
		
		closeCoCModal();
	};

	return (
		<>
			<Modal show={showCoCModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Call of Cthulhu 7e Options</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CoCModalForm onSubmit={values => handleSubmit(values)} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="success"
						type="submit"
						form="coc-mode-form">Roll!
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default CoCModal;