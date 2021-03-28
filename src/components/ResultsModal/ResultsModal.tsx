import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './ResultsModal.module.css';
import RerollContainer from '../Reroll/RerollContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { ResultsModalPropTypes } from './ResultsModalTypes';

function ResultsModal({
	hideMsg,
	msgData,
	showModal,
	diceSelected
}: ResultsModalPropTypes) {
	const { msgParams } = msgData;
	const {
		isSuccess,
		rollOptions = {},
		title,
		results = []
	} = msgParams;

	let modalBodyList;

	if (msgParams.fields && msgParams.fields.length) {
		modalBodyList = (
			<ul className={styles.resultsList}>
				{
					msgParams.fields.map((field:JSX.Element, i: number) => (
						<li key={i}>{ field }</li>
					))
				}
			</ul>
		);
	}
	const DiceIcon = <FontAwesomeIcon className={styles.resultsModalDiceIcon} icon={faDiceD20} />;
	
	const headerClass = isSuccess === false 
		? `${styles.resultsModalHeader} ${styles.isFailure}`
		: `${styles.resultsModalHeader}`;

	return (
		<Modal
			show={showModal}
			onHide={hideMsg}
		>
			<Modal.Header closeButton className={headerClass}>
				<div>
					{DiceIcon}
					<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
				</div>
			</Modal.Header>
			<Modal.Body className={styles.resultsBody}>
				{ rollOptions.isPushed && <div className={styles.pushedTitle}>Pushed roll</div> }
				{ title && <div className={styles.rollResults}>{ title }</div> }
				{ modalBodyList }
				<RerollContainer
					rollOptions={rollOptions}
					results={results}
				/>
			</Modal.Body>
			<Modal.Footer>
			<Button
				block
				variant="outline-secondary"
				onClick={hideMsg}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ResultsModal;
