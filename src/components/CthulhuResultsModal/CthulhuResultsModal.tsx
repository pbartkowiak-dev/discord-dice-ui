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
import CodeSpan from "../CodeSpan/CodeSpan";
import SuccessLevelLadder from "../SuccessLevelLadder/SuccessLevelLadder";
import joinAsBlocks from "../../utils/joinAsBlocks";
import CthulhuPushOptionsContainer from "../CthulhuPushOptions/CthulhuPushOptionsContainer";

function CthulhuResultsModal() {
	const dispatch = useDispatch();
	const hideModal = () => dispatch(closeCthulhuResultsModal());

	const cthulhuState = useSelector(({ cthulhuState }: any) => cthulhuState);
	const { showResultsModal, results } = cthulhuState;
	const {
		finalDieResult,
		successLevels,
		rollResults,
		cocBonusResult,
		cocPenaltyResult,
	} = results;

	if (!successLevels) {
		return null;
	}

	// const handleReroll = () => {
	// 	dispatch(closeCthulhuResultsModal());
	//
	// 	setTimeout(() => {
	// 		dispatch(requestCthulhuReroll());
	// 	}, 500);
	// };

	const resultsJoined = joinAsBlocks(rollResults);
	let resultsInfo = null;

	if (cocBonus || cocTwoBonus) {
		const dieWord = rollOptions.cocBonus ? 'one Bonus Die' : 'two Bonus Dice';
		resultsInfo = <>You rolled <strong>{dieWord}</strong>. Results: {resultsJoined}.</>;
	} else if (rollOptions.cocPenalty || rollOptions.cocTwoPenalty) {
		const dieWord = cocPenalty ? 'one Penalty Die' : 'two Penalty Dice';
		resultsInfo = <>You rolled <strong>{dieWord}</strong>. Results: {resultsJoined}.</>;
	}

	const skillLevelString = skillLevel <= 9 ? `0${skillLevel}` : `${skillLevel}`;

	const canPush = isSuccess === false && !rollOptions.isPushed;

	return (
		<Modal
			show={showResultsModal}
			onHide={hideModal}
		>
			<Modal.Header closeButton className={styles.resultsModalHeader}>
				<FontAwesomeIcon className={styles.resultsModalDiceIcon} icon={faDiceD20} />
				<Modal.Title className={styles.resultsModalTitle}>Roll Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.rollResults}>{ resultsInfo }</div>

				{/* Results vs Skill */}
				<ResultVsSkillRow
					skillLevel={skillLevelString}
					finalDieResult={resultString}
					isSuccess={successLevels.isSuccess}
				/>

				{/* Succes Level Ladder */}
				<SuccessLevelLadder successLevels={successLevels} />

				{/* Push */}
				{canPush && <CthulhuPushOptionsContainer
					rollOptions={rollOptions}
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
