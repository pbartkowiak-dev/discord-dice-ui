import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PoolBuilderModalPropTypes } from './PoolBuilderModalTypes';
import PoolBuilderContainer from '../PoolBuilder/PoolBuilderContainer';

function PoolBuilderModal({
	showModal,
	closePoolBuilderModal,
	requestRoll
}: PoolBuilderModalPropTypes
) {
	const handleSubmit = (values: any) => {
		// requestRoll({
		// 	diceType: D100_SL,
		// 	...values
		// });
		closePoolBuilderModal();
	};

	return (
		<Modal show={showModal} onHide={closePoolBuilderModal} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Pool Builder</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PoolBuilderContainer onSubmit={(values:any) => handleSubmit(values)} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closePoolBuilderModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					form="pool-builder-form">Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PoolBuilderModal;
