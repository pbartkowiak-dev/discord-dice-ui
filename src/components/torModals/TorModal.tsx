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
import torStyles from "../ResultsModal/ResultsModal.module.css";
import useTorStore from "../tor/store";

function TorModal() {
	const dispatch = useDispatch();
	const torState = useTorStore((torState: any) => torState);
	// const lastRollOptions = useSelector(({ lastRollOptions }: any) => lastRollOptions);
	const { isModalOpen, closeModal, isSuccess, results } = torState;


	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>The One Ring 2e Roll Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>

			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					>Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TorModal;
