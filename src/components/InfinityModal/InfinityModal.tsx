import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InfinityModalForm from './InfinityModalForm';
import { D20_INFINITY_TEST } from '../../consts/diceConstants';
import { InfinityFormValuesTypes, InfinityModalPropTypes } from './InfinityModalTypes';

function InfinityModal({
	closeInfinityModal,
	showModal,
	requestRoll
}: InfinityModalPropTypes
) {
	const handleSubmit = (values: InfinityFormValuesTypes) => {
		const {
			assistanceDice,
			dice,
			difficulty,
			focus,
			fortune,
			tn,
			untrainedTest,
			assistanceFocus,
			assistanceTn
		} = values;

		requestRoll({
			diceType: D20_INFINITY_TEST,
			assistanceDice: Number(assistanceDice),
			diceAmount: Number(dice),
			difficulty: Number(difficulty),
			focus: Number(focus),
			fortune: Number(fortune),
			tn: Number(tn),
			assistanceFocus: assistanceFocus.trim() === '' ? Number(focus) : Number(assistanceFocus),
			assistanceTn: assistanceTn.trim() === '' ? Number(tn) : Number(assistanceTn),
			untrainedTest,
			assistanceUntrainedTest: assistanceFocus && assistanceFocus.trim() === '0'
		});

		closeInfinityModal();
	};

	const initialValues = {
		dice: '2',
		assistanceDice: '0',
		fortune: '0',
		difficulty: '2',
		assistanceFocus: '',
		assistanceTn: '',
		untrainedTest: false
	};

	return (
		<Modal show={showModal} onHide={closeInfinityModal}>
			<Modal.Header closeButton>
				<Modal.Title>Infinity Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InfinityModalForm
					initialValues={initialValues}
					onSubmit={values => handleSubmit(values)}
					/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeInfinityModal}>
					Cancel
				</Button>
				<Button 
					variant="success"
					type="submit"
					form="infinity-mode-form">Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default InfinityModal;
