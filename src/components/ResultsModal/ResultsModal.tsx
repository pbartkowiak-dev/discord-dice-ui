import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './ResultsModal.module.css';
import CocPushOptionsContainer from '../CocPushOptions/CocPushOptionsContainer';
import RerollContainer from '../Reroll/RerollContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { LocalMsgParamsType } from '../../utils/getCocLocalMsg';
import { D6_CONAN, D20_CONAN_TEST } from '../../consts/conanConstants';

type msgDataType = {
	msgParams: LocalMsgParamsType
}

type ResultsModalProps = {
	hideMsg: Function
	msgData: msgDataType
	showModal: boolean
}

function ResultsModal({ hideMsg, msgData, showModal }:ResultsModalProps) {
	console.log('ResultsModal - msgData', msgData);
	const { msgParams } = msgData;
	const {
		isSuccess,
		rollOptions = {},
		title,
		finalDieResult,
		userSettings = {},
		results = []
	} = msgParams;

	let pushElement;
	let rerollElement;
	let modalBodyList;

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

	console.log('ResultsModal - rollOptions', rollOptions);

	if (rollOptions.cocMode) {
		const canPush = isSuccess === false && !rollOptions.isPushed;
		if (canPush) {
			pushElement = (
				<CocPushOptionsContainer
					rollOptions={rollOptions}
					finalDieResult={finalDieResult}
					userSettings={userSettings}
					canPush={canPush}
				/>
			);
		}
	} else {
		pushElement = null;
	}

	if (
		(rollOptions.warhammerMode && isSuccess === false) ||
		rollOptions.diceTypeRaw === D6_CONAN ||
		rollOptions.diceTypeRaw === D20_CONAN_TEST
	) {
		rerollElement = (
			<RerollContainer
				rollOptions={rollOptions}
				userSettings={userSettings}
				results={results}
			/>
		);
	} else {
		rerollElement = null;
	}

	return (
		<>
			<Modal
				show={showModal}
				dialogClassName="test"
			 	onHide={ () => hideMsg() }
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
					{ pushElement }
					{ rerollElement }
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
