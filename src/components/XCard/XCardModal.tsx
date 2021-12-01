import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useXCardStore, { State } from "./store";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import classNames from "classnames";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";

export default () => {
	const xCardStore = useXCardStore((xCardStore: State) => xCardStore);
	const {
		isModalOpen,
		closeModal,
		isAnonymous,
		setIsAnonymous,
		throwXCard
	} = xCardStore;

	const onSubmit = () => {
		throwXCard();
		closeModal();
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>X-Card Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<section>
					<p>If during the games happens anything that's bothering you, please let the group know by submiting the X-Card. You can use this Safety Tool to let to others know you want to skip this scene.</p>
					<p>You don't have to give any reason for doing so.</p>
					<p>The X-Card exists so anyone could feel comfortable during a game.</p>
				</section>
				<section>
					<div>
						<Form.Check
							type="checkbox"
							name="isAnonymous"
							id="isAnonymous"
							label="Throw the X-Card Anonymously"
							checked={isAnonymous}
							onChange={() => setIsAnonymous(!isAnonymous)}
							custom
						/>
					</div>
				</section>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					onClick={onSubmit}
				>Throw the X-Card
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
