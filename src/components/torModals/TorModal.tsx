import React, { useState } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import torStyles from "./TorModal.module.css";
import useTorStore from "../tor/store";
import InputRange from "../InputRange/InputRange";
import Form from "react-bootstrap/Form";
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function TorModal() {
	const torState = useTorStore((torState: any) => torState);
	const { isModalOpen, closeModal } = torState;

	const tnInputId = 'tn-input'
	const tnMax = 20;
	const tnMin = 0;
	const [tn, setTn] = useState<string>('');

	const isValid = () => {
		let isValid = true;
		const tnNumber = Number(tn);

		if (isNaN(tnNumber) || tnNumber <= 0 || tnNumber > tnMax) {
			isValid = false;
		}

		return isValid;
	}

	const onTnRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTn(event.target.value);
	};

	const onTnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputRange = document.getElementById(tnInputId) as HTMLInputElement;
		const { value } = event.target;
		const valueNumber = Number(value);

		if (valueNumber <= tnMax && !isNaN(valueNumber) && valueNumber >= tnMin) {
			if (inputRange) {
				inputRange.value = value;
			}
			setTn(value);
		}
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>The One Ring 2e Roll Options</Modal.Title>
			</Modal.Header>
			<Modal.Body className={torStyles.torModalBody}>
				<div className={torStyles.tnContainer}>
					<InfoTooltip
						content="Target Number"
						className={torStyles.tnInfoIcon}
					/>
					<Form.Control
						type="text"
						size="lg"
						placeholder="TN"
						autoComplete="off"
						onChange={onTnChange}
						value={tn}
						className={torStyles.tnInput}

					/>
				</div>
				<InputRange
					id={tnInputId}
					onChange={onTnRangeChange}
					hidePercent={true}
					max={tnMax}
					min={tnMin}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					Cancel
				</Button>
				<Button
					variant="success"
					type="submit"
					disabled={!isValid()}
					>Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TorModal;
