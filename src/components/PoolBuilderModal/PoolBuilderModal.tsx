import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PoolBuilderModalPropTypes, PoolType } from './PoolBuilderModalTypes';
import PoolBuilderContainer from '../PoolBuilder/PoolBuilderContainer';

function PoolBuilderModal({
	showModal,
	closePoolBuilderModal,
	submitRoll
}: PoolBuilderModalPropTypes
) {
	const handleSubmit = (event: React.FormEvent, pool: PoolType) => {
		event.preventDefault();
		submitRoll({ pool });
		closePoolBuilderModal();
	};

	return (
		<Modal show={showModal} onHide={closePoolBuilderModal} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Pool Builder</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PoolBuilderContainer handleSubmit={handleSubmit} />
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
