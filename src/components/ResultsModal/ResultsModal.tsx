import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './ResultsModal.module.css';
import RerollContainer from '../Reroll/RerollContainer';
import { ResultsModalPropTypes } from './ResultsModalTypes';
import useDiceModuleFormStore from "../DiceModuleOptions/store";
import classNames from "classnames";

function ResultsModal({
	hideMsg,
	msgData,
	showModal
}: ResultsModalPropTypes) {
	const { msgParams } = msgData;
	const {
		isSuccess,
		rollOptions = {},
		title,
		results = [],
		isPool
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

	const { mode } = useDiceModuleFormStore(( state ) => state);

	return (
		<Modal
			show={showModal}
			onHide={hideMsg}
		>
			<Modal.Header closeButton className={classNames({
				[`${styles.isFailure}`]: isSuccess === false,
				[`${styles.resultsModalHeader}`]: true
			})}>
				<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles.resultsBody}>
				{ title && <div className={styles.rollResults}>{ title }</div> }
				{ modalBodyList }
				<RerollContainer
					rollOptions={rollOptions}
					isPool={isPool}
					isFate={mode === 'fateMode'}
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
