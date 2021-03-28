import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from "../ResultsModal/ResultsModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { closeCthulhuResultsModal } from "../../actions/cthulhu.actions";
import ResultVsSkillRow from "../ResultVsSkillRow/ResultVsSkillRow";
import SuccessLevelLadder from "../SuccessLevelLadder/SuccessLevelLadder";
import joinAsBlocks from "../../utils/joinAsBlocks";
import CthulhuPushOptions from "./CthulhuPushOptions";

function CthulhuResultsModal() {
	const dispatch = useDispatch();
	const hideModal = () => dispatch(closeCthulhuResultsModal());
	const cthulhuState = useSelector(({ cthulhuState }: any) => cthulhuState);
	const lastRollOptions = useSelector(({ lastRollOptions }: any) => lastRollOptions);
	const { showResultsModal, isPushed, results } = cthulhuState;

	const {
		skillLevel,
		finalDieResult,
		successLevels,
		rollResults,
	} = results;

	if (!successLevels) {
		return null;
	}

	const {
		cthulhuBonus,
		cthulhuTwoBonus,
		cthulhuPenalty,
		cthulhuTwoPenalty
	} = lastRollOptions;

	const {
		isSuccess,
	} = successLevels;

	const resultsJoined = joinAsBlocks(rollResults);
	let resultsInfo = null;

	if (cthulhuBonus || cthulhuTwoBonus) {
		const dieWord = cthulhuBonus ? 'one Bonus Die' : 'two Bonus Dice';
		resultsInfo = <>You rolled <strong>{dieWord}</strong>. Results: {resultsJoined}.</>;
	} else if (cthulhuPenalty || cthulhuTwoPenalty) {
		const dieWord = cthulhuPenalty ? 'one Penalty Die' : 'two Penalty Dice';
		resultsInfo = <>You rolled <strong>{dieWord}</strong>. Results: {resultsJoined}.</>;
	}

	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;
	const canPush = !isSuccess && !isPushed;

	return (
		<Modal
			show={showResultsModal}
			onHide={hideModal}
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

				{/* Results vs Skill */}
				<ResultVsSkillRow
					skillLevel={skillLevelString}
					finalDieResult={finalDieResult}
					isSuccess={isSuccess}
				/>

				{/* Success Level Ladder */}
				<SuccessLevelLadder successLevels={successLevels} />

				{/* Push */}
				{canPush && <CthulhuPushOptions
					skillLevel={skillLevel}
					finalDieResult={finalDieResult}
				/>}
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-secondary"
					onClick={hideModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CthulhuResultsModal;
