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
				title="Narrative Dice Symbols"
				content="GeneriSys Symbols by cbeck is licensed under a Creative Commons Attribution 4.0 International License"
				link="http://creativecommons.org/licenses/by/4.0/"
				link2="https://github.com/c-bec-k/GeneriSysSymbols"
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
