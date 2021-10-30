import React from 'react';
import { useDispatch } from "react-redux";
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { closeCthulhuResultsModal } from "../../actions/cthulhu.actions";
import ResultVsSkillRow from "../ResultVsSkillRow/ResultVsSkillRow";
import SuccessLevelLadder from "../SuccessLevelLadder/SuccessLevelLadder";
import joinAsBlocks from "../../utils/joinAsBlocks";
import styles from './TorModal.module.css';
import torStyles from "../ResultsModal/ResultsModal.module.css";
import useTorStore from '../tor/store';

function TorResultsModal() {
	const dispatch = useDispatch();
	const torState = useTorStore((torState: any) => torState);
	// const lastRollOptions = useSelector(({ lastRollOptions }: any) => lastRollOptions);
	console.log('torState', torState)
	const { isResultsModalOpen, closeResultsModal, isSuccess, results } = torState;


	const resultsJoined = joinAsBlocks(results);
	let resultsInfo = null;


	return (
		<Modal
			show={isResultsModalOpen}
			onHide={closeResultsModal}
		>
			<Modal.Header closeButton className={classNames({
				[styles.resultsModalHeader]: true,
				[styles.isFailure]: !isSuccess
			})}>
				<FontAwesomeIcon className={styles.resultsModalDiceIcon} icon={faDiceD20} />
				<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.rollResults}>{ resultsInfo }</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-secondary"
					onClick={closeResultsModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TorResultsModal;
