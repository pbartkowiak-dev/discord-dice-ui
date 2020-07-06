import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ConanModalForm from './ConanModalForm';
import { request } from '../../utils/request';
import getConanRequestMsg from '../../utils/getConanRequestMsg';
import getConanLocalMsg from '../../utils/getConanLocalMsg';
import rollDice from '../../utils/rollDice';

type ConanModalProps = {
	userSettings: any
	showConanModal: boolean
	closeConanModal: Function
	showMsg: Function
}

function ConanModal({
	userSettings,
	showConanModal,
	closeConanModal,
	showMsg
}: ConanModalProps
) {
	const handleClose = () => {
		closeConanModal();
	};

	const handleSubmit = (values:any) => {
		const rollOptions = {
			...values,
			conanMode: true
		};
		const result = rollDice({
			diceType: 20,
			diceAmount: Number(rollOptions.dice),
			rollOptions
		});
		// const requestMsg = getConanRequestMsg(result.results, rollOptions, userSettings);
		const localMsg = getConanLocalMsg(result.results, rollOptions, userSettings);

		showMsg(localMsg);
		// request(requestMsg);

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
			<Modal show={showConanModal} onHide={handleClose}>
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