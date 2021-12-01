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
				title="Conan 2d20 Tokens"
				content="Momentum and Doom tokens are taken from Riotous GM blog."
				link="https://riotousgm.wordpress.com/2017/10/29/conan-tokens/"
			/>
			<CopyrightModalRow
				title="The X-Card"
				content={(
					<>
						<p>The X-Card is an optional tool created by John Stavropoulos that allows anyone in your game
							(including you) to edit out any content anyone is uncomfortable with as you play.</p>
						<p>Ask you GM for more details or check the link below.</p>
					</>
				)}
				link="http://tinyurl.com/x-card-rpg"
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
