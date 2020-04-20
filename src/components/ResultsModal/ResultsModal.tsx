import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './ResultsModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

type ResultsModalProps = {
	hideMsg:Function,
	msgData:any
}


function ResultsModal({ hideMsg, msgData }:ResultsModalProps) {
	const msg = msgData.msgParams;
	let modalBodyList = null;
	if (msg.fields && msg.fields.length) {
		modalBodyList = (
			<Modal.Body className={styles.resultsBody}>
				<ul className={styles.resultsList}>
					{
						msg.fields.map((field:JSX.Element, i:number) => (
							<li key={i}>{ field }</li>
						))
					}
				</ul>
			</Modal.Body>
		);
	}
	const DiceIcon = <FontAwesomeIcon className={styles.resultsModalDiceIcon} icon={faDiceD20} />;

	return (
		<>
			<Modal
				show={msgData.showMsg}
				dialogClassName="test"
			 	onHide={() => hideMsg()}
			>
				<Modal.Header closeButton className={styles.resultsModalHeader}>
					<div>
					{DiceIcon}
					<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body className={styles.resultsBody}>
					<p>{ msg.title }</p>
					{ modalBodyList }
				</Modal.Body>
				<Modal.Footer>
				<Button
					block
					variant="outline-success"
					onClick={() => hideMsg()}>OK</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ResultsModal;