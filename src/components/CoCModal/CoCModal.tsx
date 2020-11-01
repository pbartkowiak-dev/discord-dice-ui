import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CoCModalForm from './CoCModalForm';

type CoCModalProps = {
	showModal: boolean,
	closeCoCModal: (event?: React.MouseEvent<HTMLElement> ) => void,
	requestDiceRoll: Function
}

interface CoCFormValues {
	cocTwoBonus?: boolean;
	cocTwoPenalty?: boolean;
	skillLevel: string;
}

function CoCModal({
	showModal,
	closeCoCModal,
	requestDiceRoll
}: CoCModalProps
) {
	const handleSubmit = (values: CoCFormValues) => {
		console.log('values', values);
		requestDiceRoll({
			diceType: 100,
			...values
		});
		closeCoCModal();
	};

	return (
		<Modal show={showModal} onHide={closeCoCModal}>
			<Modal.Header closeButton>
				<Modal.Title>Call of Cthulhu 7e Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CoCModalForm onSubmit={values => handleSubmit(values)} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeCoCModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					form="coc-mode-form">Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CoCModal;
