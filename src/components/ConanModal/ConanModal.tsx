import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ConanModalForm from './ConanModalForm';
import { D20_CONAN_TEST } from '../../consts/diceConstants';
import { ConanFormValuesTypes, ConanModalPropTypes } from './ConanModalTypes';

function ConanModal({
	closeConanModal,
	showModal,
	requestRoll
}: ConanModalPropTypes
) {
	const handleSubmit = (values: ConanFormValuesTypes) => {
		const {
			assistanceDice,
			dice,
			difficulty,
			focus,
			fortune,
			tn,
			untrainedTest,
			assistanceFocus,
			assistanceTn,
			assistanceUntrainedTest
		} = values;

		requestRoll({
			diceType: D20_CONAN_TEST,
			assistanceDice: Number(assistanceDice),
			diceAmount: Number(dice),
			difficulty: Number(difficulty),
			focus: Number(focus),
			fortune: Number(fortune),
			tn: Number(tn),
			assistanceFocus: assistanceFocus.trim(),
			assistanceTn: assistanceTn.trim(),
			untrainedTest,
			assistanceUntrainedTest
		});

		closeConanModal();
	};

	const initialValues = {
		dice: '2',
		assistanceDice: '0',
		fortune: '0',
		difficulty: '2',
		assistanceFocus: '',
		assistanceTn: '',
		untrainedTest: false,
		assistanceUntrainedTest: false
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
