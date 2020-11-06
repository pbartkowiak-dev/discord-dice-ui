import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ConanModalForm from './ConanModalForm';
import { D20_CONAN_TEST } from '../../consts/conanConstants';
import { ConanFormValuesTypes, ConanModalPropTypes } from './ConanModalTypes';

function ConanModal({
	closeConanModal,
	showModal,
	requestRoll
}: ConanModalPropTypes
) {
	const handleSubmit = (values: ConanFormValuesTypes) => {
		console.log('conan form values', values);
		const {
			assistanceDice,
			dice,
			difficulty,
			focus,
			fortune,
			tn,
			untrainedTest
		} = values;

		requestRoll({
			diceType: D20_CONAN_TEST,
			assistanceDice: Number(assistanceDice),
			dice: Number(dice),
			difficulty: Number(difficulty),
			focus: Number(focus),
			fortune: Number(fortune),
			tn: Number(tn),
			untrainedTest
		});

		// const result = rollDice({
		// 	diceType: 20,
		// 	diceAmount: Number(rollOptions.dice),
		// 	rollOptions
		// });

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
		<Modal show={showModal} onHide={closeConanModal}>
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
				<Button variant="secondary" onClick={closeConanModal}>
					Cancel
				</Button>
				<Button 
					variant="success"
					type="submit"
					form="conan-mode-form">Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConanModal;
