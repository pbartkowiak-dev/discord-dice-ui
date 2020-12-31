import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PoolBuilderDie from '../PoolBuilder/PoolBuilderDie';
import { DOOM, MOMENTUM } from '../../consts/diceConstants';
import styles from './ConanTokensModal.module.css';

function ConanTokensModal({
	updateTokensState,
	showModal,
	hideMsg,
	momentum,
	doom
}: any) {
	const [momentumState, setMomentumState] = useState('0');
	const [doomState, setDoomState] = useState('0');

	const handleUpdateTokens = () => {
		updateTokensState({
			momentum: momentumState,
			doom: doomState
		});
	};

	const onIncrease = (tokenType: string) => {
		if (tokenType === MOMENTUM) {
			const newVal = Number(momentumState) + 1;
			setMomentumState(`${newVal}`);
		}
		if (tokenType === DOOM) {
			const newVal = Number(doomState) + 1;
			setDoomState(`${newVal}`);
		}
	};

	const onDecrease = (tokenType: string) => {
		if (tokenType === MOMENTUM) {
			const newVal = Number(momentumState) - 1;
			if (newVal >= 0) setMomentumState(`${newVal}`); 
		}
		if (tokenType === DOOM) {
			const newVal = Number(doomState) - 1;
			if (newVal >= 0) setDoomState(`${newVal}`);
		}
	};

	const onChange = (tokenType: string, event: any) => {
		const { value } = event.target;

		if (tokenType === MOMENTUM && isValueValid(value, tokenType)) {
			setMomentumState(value);
		}
		if (tokenType === DOOM && isValueValid(value, tokenType)) {
			setDoomState(value);
		}
	};

	const isValueValid = (val: string, tokenType: string) => {
		const num = Number(val);
		const maxAmount = tokenType === MOMENTUM ? 6 : 30;
		const minAmount = 0;

		if (!isNaN(num) && num >= minAmount && num <= maxAmount) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (momentum) {
			setMomentumState(momentum);
		}
		if (doom) {
			setDoomState(doom);
		}
	}, [momentum, doom, showModal])

	return (
		<Modal show={showModal} onHide={hideMsg}>
			<Modal.Header closeButton>
				<Modal.Title>Update pools</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.container}>
					<PoolBuilderDie
						title="Doom"
						diceType={DOOM}
						diceImg="doom.png"
						value={doomState}
						onChange={onChange}
						onIncrease={onIncrease}
						onDecrease={onDecrease}
						isDiceImgLarge={true}
					/>

					<PoolBuilderDie
							title="Momentum"
							diceType={MOMENTUM}
							diceImg="momentum.png"
							value={momentumState}
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

export default ConanTokensModal;
