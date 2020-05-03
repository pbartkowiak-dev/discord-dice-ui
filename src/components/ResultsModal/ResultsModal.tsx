import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './ResultsModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { LocalMsgParamsType } from '../../utils/getCocLocalMsg';

type msgDataType = {
	showMsg: boolean
	msgParams: LocalMsgParamsType
}

type ResultsModalProps = {
	hideMsg:Function
	msgData:msgDataType
}

function ResultsModal({ hideMsg, msgData }:ResultsModalProps) {
	const { msgParams } = msgData;
	let modalBodyList = null;
	if (msgParams.fields && msgParams.fields.length) {
		modalBodyList = (
			<Modal.Body className={styles.resultsBody}>
				<ul className={styles.resultsList}>
					{
						msgParams.fields.map((field:JSX.Element, i:number) => (
							<li key={i}>{ field }</li>
						))
					}
				</ul>
			</Modal.Body>
		);
	}
	const DiceIcon = <FontAwesomeIcon className={styles.resultsModalDiceIcon} icon={faDiceD20} />;
	const headerClass = msgParams.isSuccess === false 
		? `${styles.resultsModalHeader} ${styles.isFailure}`
		: `${styles.resultsModalHeader}`
	return (
		<>
			<Modal
				show={msgData.showMsg}
				dialogClassName="test"
			 	onHide={() => hideMsg()}
			>
				<Modal.Header closeButton className={headerClass}>
					<div>
						{DiceIcon}
						<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body className={styles.resultsBody}>
					{ msgParams.title && <p>{ msgParams.title }</p> }
					{ modalBodyList }
				</Modal.Body>
				<Modal.Footer>
				<Button
					block
					variant="outline-secondary"
					onClick={() => hideMsg()}>Close</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ResultsModal;