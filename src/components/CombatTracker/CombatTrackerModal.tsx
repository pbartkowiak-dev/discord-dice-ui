// @ts-nocheck
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useCombatTrackerStore from "./store";
import Zone from "./Zone";
import AddZone from "./AddZone";
import { combatTrackerSend } from "../../actions/combatTracker.actions";
import styles from './CombatTracker.module.css';
import DropdownRoller from "../DropdownRoller/DropdownRoller";
import classNames from "classnames";

function CombatTrackerModal() {
	const dispatch = useDispatch();
	const showModal = useCombatTrackerStore(({ isModalOpen }) => isModalOpen);
	const zones: Array<string> = useCombatTrackerStore(({ zones }) => zones);
	const closeModal: () => void = useCombatTrackerStore(({ closeModal }) => closeModal);
	const clearState: () => void = useCombatTrackerStore(({ clearState }) => clearState);
	const renders: () => void = useCombatTrackerStore(({ renders }) => renders);

	const [isDropdownOpen, setDropdownState] = useState(false);

	const handleSend = () => {
		dispatch(combatTrackerSend());
	};

	const handleSendAndClose = () => {
		dispatch(combatTrackerSend());
		closeModal();
	};

	const onToggle = (isOpen: boolean) => {
		setDropdownState(isOpen);
	};

	return (
		<Modal show={showModal} onHide={closeModal} size="lg">
			<div className={classNames({
				[styles.overlay]: true,
				[styles.hidden]: !isDropdownOpen
			})}	/>
			<Modal.Header closeButton>
				<Modal.Title>Combat Tracker</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Zone
					name="Waiting Room"
					index={-1}
					key={`waitingRoom:${renders}`}
				/>
				<AddZone />
				<section>
					{
						zones.map((zone: string, i: number) => (
							<Zone
								name={zone}
								index={i}
								key={`${i}:${renders}`}
							/>))
					}
				</section>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footerContainer}>
					<div className={styles.footerContainerDropdown}>
						<DropdownRoller onToggle={onToggle} />
					</div>
					<div className={styles.footerContainerButtons}>
						<Button variant="outline-danger" onClick={clearState} className={styles.button}>
							Clear
						</Button>
						<Button variant="outline-secondary" onClick={closeModal} className={styles.button}>
							Close
						</Button>
						<Button variant="outline-success" onClick={handleSendAndClose} className={styles.button}>
							Send and Close
						</Button>
						<Button variant="success" onClick={handleSend} className={styles.button}>
							Send
						</Button>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CombatTrackerModal;
