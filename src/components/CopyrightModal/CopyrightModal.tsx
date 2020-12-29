import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CopyrightModalRow from './CopyrightModalRow';

interface CopyrightModalProps {
	showModal: boolean;
	closeCopyrightModal: () => void;
}

function CopyrightModal({
	showModal,
	closeCopyrightModal
}: CopyrightModalProps
) {

	return (
		<Modal show={showModal} onHide={closeCopyrightModal}>
			<Modal.Header closeButton>
				<Modal.Title>Copyright Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<CopyrightModalRow
				title="Font Awesome Free Icons"
				content="Icons the app use come from Font Awesome v5."
				link="https://fontawesome.com/"
				link2="https://github.com/FortAwesome/Font-Awesome"
			/>
			<CopyrightModalRow
				title="Conan 2d20 Tokents"
				content="Momentum and Doom tokens are taken from Riotous GM blog."
				link="https://riotousgm.wordpress.com/2017/10/29/conan-tokens/"
			/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeCopyrightModal}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CopyrightModal;
