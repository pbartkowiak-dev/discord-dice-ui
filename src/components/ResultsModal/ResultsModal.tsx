import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './ResultsModal.module.css';
import CocPushOptionsContainer from '../CocPushOptions/CocPushOptionsContainer';
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
	const {
		isSuccess,
		rollOptions = {},
		title,
		finalDieResult,
		userSettings = {}
	} = msgParams;
	let modalBodyList;

	console.log('rollOptions', rollOptions)

	if (msgParams.fields && msgParams.fields.length) {
		modalBodyList = (
			<ul className={styles.resultsList}>
				{
					msgParams.fields.map((field:JSX.Element, i:number) => (
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
	
	const canPush = isSuccess === false && (rollOptions && rollOptions.cocMode && !rollOptions.isPushed);

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
					{ rollOptions.isPushed && <div className={styles.pushedTitle}>Pushed roll</div> }
					{ title && <p className={styles.rollResults}>{ title }</p> }
					{ modalBodyList }
					{ canPush && <CocPushOptionsContainer
							rollOptions={rollOptions}
							finalDieResult={finalDieResult}
							userSettings={userSettings}
							/>
				}
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