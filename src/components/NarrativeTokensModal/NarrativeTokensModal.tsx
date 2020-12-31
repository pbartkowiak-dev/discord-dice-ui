import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PoolBuilderDie from '../PoolBuilder/PoolBuilderDie';
import { DESTINY_DARK, DESTINY_LIGHT } from '../../consts/diceConstants';
import styles from './NarrativeTokensModal.module.css';

function NarrativeTokensModal({
	updateNarrativeTokensState,
	showModal,
	hideMsg,
	destinyLight,
	destinyDark
}: any) {
	const [destinyLightState, setDestinyLightState] = useState('0');
	const [destinyDarkState, setDestinyDarkState] = useState('0');

	const handleUpdateTokens = () => {
		updateNarrativeTokensState({
			destinyLight: destinyLightState,
			destinyDark: destinyDarkState
		});
	};

	const onIncrease = (tokenType: string) => {
		if (tokenType === DESTINY_LIGHT) {
			const newVal = Number(destinyLightState) + 1;
			setDestinyLightState(`${newVal}`);
		}
		if (tokenType === DESTINY_DARK) {
			const newVal = Number(destinyDarkState) + 1;
			setDestinyDarkState(`${newVal}`);
		}
	};

	const onDecrease = (tokenType: string) => {
		if (tokenType === DESTINY_LIGHT) {
			const newVal = Number(destinyLightState) - 1;
			if (newVal >= 0) setDestinyLightState(`${newVal}`); 
		}
		if (tokenType === DESTINY_DARK) {
			const newVal = Number(destinyDarkState) - 1;
			if (newVal >= 0) setDestinyDarkState(`${newVal}`);
		}
	};

	const onChange = (tokenType: string, event: any) => {
		const { value } = event.target;

		if (tokenType === DESTINY_LIGHT && isValueValid(value)) {
			setDestinyLightState(value);
		}
		if (tokenType === DESTINY_DARK && isValueValid(value)) {
			setDestinyDarkState(value);
		}
	};

	const isValueValid = (val: string) => {
		const num = Number(val);
		const maxAmount = 30;
		const minAmount = 0;

		if (!isNaN(num) && num >= minAmount && num <= maxAmount) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (destinyLight) {
			setDestinyLightState(destinyLight);
		}
		if (destinyDark) {
			setDestinyDarkState(destinyDark);
		}
	}, [destinyLight, destinyDark, showModal])

	return (
		<Modal show={showModal} onHide={hideMsg}>
			<Modal.Header closeButton>
				<Modal.Title>Update pools</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.container}>
					<PoolBuilderDie
						title="Dark Destiny Points"
						diceType={DESTINY_DARK}
						diceImg="destiny_dark.png"
						value={destinyDarkState}
						onChange={onChange}
						onIncrease={onIncrease}
						onDecrease={onDecrease}
						isDiceImgLarge={true}
					/>

					<PoolBuilderDie
							title="Light Destiny Points"
							diceType={DESTINY_LIGHT}
							diceImg="destiny_light.png"
							value={destinyLightState}
							onChange={onChange}
							onIncrease={onIncrease}
							onDecrease={onDecrease}
							isDiceImgLarge={true}
						/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={hideMsg}>
					Cancel
				</Button>
				<Button
					variant="success"
					onClick={handleUpdateTokens}
					type="submit">Update pools
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NarrativeTokensModal;
