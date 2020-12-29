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
						// @ts-ignore
						value={doomState}
						// modifierValue={modifierState}
						onChange={onIncrease}
						onIncrease={onIncrease}
						onDecrease={onDecrease}
						isDiceImgLarge={true}
					/>

					<PoolBuilderDie
							title="Momentum"
							diceType={MOMENTUM}
							diceImg="momentum.png"
							// @ts-ignore
							value={momentumState}
							// modifierValue={modifierState}
							onChange={onIncrease}
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
