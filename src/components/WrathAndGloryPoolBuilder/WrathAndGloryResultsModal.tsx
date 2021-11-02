// @ts-nocheck
import React, { FC, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useWrathAndGloryStore from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import ResultsGrid from "./ResultsGrid";
import ResultsTable from "./ResultsTable";
import IconsResultsContainer from "./IconsResultsContainer";
import RerollOverlay from "./RerollOverlay";
import PoolBuilderDie from "../PoolBuilder/PoolBuilderDie";
import { D6 } from "../../consts/diceConstants";
import { isValueValid } from "../WarhammerMoneyModal/WarhammerMoneyModal";

const WrathAndGloryResultsModal: FC = () => {
	const [addD6Amount, setAddD6Amount] = useState<number>(0);
	const [isRolling, setIsRolling] = useState<boolean>(false);
	const wasAllDiceRerolled: number[] = useWrathAndGloryStore(({ wasAllDiceRerolled }) => wasAllDiceRerolled);
	const isModalOpen = useWrathAndGloryStore(({ isModalOpen }) => isModalOpen);
	const closeModal: () => void = useWrathAndGloryStore(({ closeModal }) => closeModal);
	const selectedIds: number[] = useWrathAndGloryStore(({ selectedIds }) => selectedIds);
	const rerollAll: number[] = useWrathAndGloryStore(({ rerollAll }) => rerollAll);
	const rerollSelected: number[] = useWrathAndGloryStore(({ rerollSelected }) => rerollSelected);
	const increaseDicePool: number[] = useWrathAndGloryStore(({ increaseDicePool }) => increaseDicePool);
	const areDiceAdded: number[] = useWrathAndGloryStore(({ areDiceAdded }) => areDiceAdded);
	const increaseDicePoolMax = 10;


	const handleRerollAll = () => {
		setIsRolling(true);
		setTimeout(() => {
			rerollAll();
			setIsRolling(false);
		}, 1000);
	};

	const handleRerollSelected = () => {
		setIsRolling(true);
		setTimeout(() => {
			rerollSelected();
			setIsRolling(false);
		}, 1000);
	};

	const onChange = (_, event: any) => {
		const value = Number(event.target.value);
		if (isValueValid(event.target.value) && value <= increaseDicePoolMax) {
			setAddD6Amount(value);
		}
	};

	const onIncrease = () => {
		const newValue = Number(addD6Amount) + 1;
		if (newValue <= increaseDicePoolMax) {
			setAddD6Amount(newValue);
		}
	};

	const onDecrease = () => {
		const newValue = Number(addD6Amount) - 1;
		if (newValue >= 0) {
			setAddD6Amount(newValue);
		}
	};

	const handleIncreaseDicePool = () => {
		setIsRolling(true);
		setTimeout(() => {
			setAddD6Amount(0);
			increaseDicePool(addD6Amount);
			setIsRolling(false);
		}, 1000);
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<div className={styles.modalWrapper}>
			{isRolling && <RerollOverlay />}
			<Modal.Header closeButton>
				<Modal.Title>
					Wrath and Glory Results {wasAllDiceRerolled ? <small>(all dice rerolled)</small> : null}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.content}>
					<div className={styles.leftContent}>
						<ResultsTable />
					</div>
					<div className={styles.rightContent}>
						<ResultsGrid />
						<hr className={styles.resultsGridSeparator} />
						<IconsResultsContainer />
						<hr/>
						<section className={styles.rerollButtonsContainer}>
							<Button
								variant="outline-info"
								onClick={handleRerollAll}
								disabled={isRolling}
							>Reroll all dice</Button>
							<Button
								variant="outline-primary"
								onClick={handleRerollSelected}
								disabled={selectedIds.length === 0 || isRolling}
							>Reroll selected</Button>
						</section>
						<hr />
						<section>
							<div className={styles.increaseDicePoolContainer}>
								<div className={styles.increaseDicePoolCounterContainer}>
									<PoolBuilderDie
										diceType={D6}
										value={addD6Amount}
										onChange={onChange}
										onIncrease={onIncrease}
										onDecrease={onDecrease}
										noImage={true}
										variant={"secondary"}
										isDiceImgLarge={false}
										disabled={areDiceAdded || isRolling}
										readOnly={areDiceAdded}
									/>
								</div>
								<div className={styles.increaseDicePoolButtonContainer}>
									<Button
										variant="outline-secondary"
										onClick={handleIncreaseDicePool}
										disabled={areDiceAdded || addD6Amount === 0 || isRolling}
									>Increase Dice Pool</Button>
								</div>
							</div>
						</section>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footerContainer}>
					<div className={styles.footerContainerButtons}>
						<Button
							variant="outline-secondary"
							onClick={closeModal}
							className={styles.button}>
							Close
						</Button>
					</div>
				</div>
			</Modal.Footer>
			</div>
		</Modal>
	);
}

export default WrathAndGloryResultsModal;
