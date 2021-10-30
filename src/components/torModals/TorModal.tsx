import React, { useState } from 'react';
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
import InputRange from "../InputRange/InputRange";
import Form from "react-bootstrap/Form";

function TorModal() {
	const dispatch = useDispatch();
	const torState = useTorStore((torState: any) => torState);
	// const lastRollOptions = useSelector(({ lastRollOptions }: any) => lastRollOptions);
	const { isModalOpen, closeModal, isSuccess, results } = torState;

	const tnInputId = 'tn-input'
	const [tn, setTn] = useState<string>();
	const onTnRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => setTn(event.target.value);

	const onTnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputRange = document.getElementById(tnInputId) as HTMLInputElement;
		if (inputRange) {
			inputRange.value = event.target.value;
		}
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>The One Ring 2e Roll Options</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<div className="percent-icon-container">
						<Form.Control
							type="text"
							size="lg"
							placeholder="TN"
							autoComplete="off"
							onChange={onTnChange}
							value={tn}

							// isInvalid ={hasError}
							//{...input}
						/>
					</div>
					{/*{ hasError && <Form.Control.Feedback type="invalid">{ error }</Form.Control.Feedback> }*/}
					{/*{ textMuted && <Form.Text className="text-muted">{ textMuted }</Form.Text> }*/}
				</Form.Group>
				<InputRange
					id={tnInputId}
					onChange={onTnRangeChange}
					hidePercent={true}
					max={20}
					min={1}
				/>
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
