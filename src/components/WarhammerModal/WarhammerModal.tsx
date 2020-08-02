import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import WarhammerModalForm from './WarhammerModalForm';
import { request } from '../../utils/request';
import getWarhammerRequestMsg from '../../utils/getWarhammerRequestMsg';
import getWarhammerLocalMsg from '../../utils/getWarhammerLocalMsg';
import rollDice from '../../utils/rollDice';
import localStorageWarhammerSlModeManager from '../../utils/localStorageWarhammerSlModeManager';

type WarhammerModalProps = {
	userSettings: any
	showModal: boolean
	closeWarhammerModal: Function
	showMsgModal: Function
	warhammerSlMode: string
}

function WarhammerModal({
	userSettings,
	showModal,
	closeWarhammerModal,
	showMsgModal,
	warhammerSlMode
}: WarhammerModalProps
) {
	const handleClose = () => {
		closeWarhammerModal();
	};

	const initialValues = {
		warhammerSlMode
	};

	const handleSubmit = (values:any) => {
		const rollOptions = {
			...values,
			warhammerMode: true
		};
		const { warhammerSlMode } = rollOptions;
		const result = rollDice({
			diceType: 100,
			rollOptions
		});
		const requestMsg = getWarhammerRequestMsg(result, rollOptions, userSettings);
		const localMsg = getWarhammerLocalMsg(result, rollOptions, userSettings);

		showMsgModal(localMsg);
		request(requestMsg);

		localStorageWarhammerSlModeManager.save(warhammerSlMode);

		closeWarhammerModal();
	};

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
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
