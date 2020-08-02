import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ConanModalForm from './ConanModalForm';
import { D20_CONAN_TEST } from '../../consts/conanConstants';
import { request } from '../../utils/request';
import getConanRequestMsg from '../../utils/getConanRequestMsg';
import getConanLocalMsg from '../../utils/getConanLocalMsg';
import rollDice from '../../utils/rollDice';

type ConanModalProps = {
	userSettings: any
	closeConanModal: Function
	showMsgModal: Function
	showModal: boolean
}

function ConanModal({
	userSettings,
	closeConanModal,
	showMsgModal,
	showModal
}: ConanModalProps
) {
	const handleClose = () => {
		closeConanModal();
	};

	const handleSubmit = (values:any) => {
		const rollOptions = {
			...values,
			diceTypeRaw: D20_CONAN_TEST
		};

		const result = rollDice({
			diceType: 20,
			diceAmount: Number(rollOptions.dice),
			rollOptions
		});
		const requestMsg = getConanRequestMsg(result, rollOptions, userSettings);
		const localMsg = getConanLocalMsg(result, rollOptions, userSettings);

		showMsgModal(localMsg);
		request(requestMsg);

		closeConanModal();
	};

	const initialValues = {
		dice: '2',
		assistanceDice: '0',
		fortune: '0',
		difficulty: '2',
		untrainedTest: false
	};

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Conan Options</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ConanModalForm
						initialValues={initialValues}
						onSubmit={values => handleSubmit(values)}
						/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button 
						variant="success"
						type="submit"
						form="conan-mode-form">Roll!
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ConanModal;