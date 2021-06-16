// @ts-nocheck
import React, { FC, useState } from 'react';
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import useWrathAndGloryStore, { Result } from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";
import ResultsGrid from "./ResultsGrid";
import ResultsTable from "./ResultsTable";
import CodeSpan from "../CodeSpan/CodeSpan";

const RerollOverlay: FC = () => {
	return (
		<div className={styles.rerollOverlay}>
			<div className={styles.rerollBackground}/>
			<Spinner animation="border" role="status" variant="primary" className={styles.rerollSpinner}>
				<span className="sr-only">Rerolling...</span>
			</Spinner>
		</div>
	);
};

const WrathAndGloryResultsModal: FC = () => {
	const [isRerolling, setIsRerolling] = useState<boolean>(false);
	const exaltedIcons: number[] = useWrathAndGloryStore(({ exaltedIcons }) => exaltedIcons);
	const normalIcons: number[] = useWrathAndGloryStore(({ normalIcons }) => normalIcons);
	const totalIcons: number[] = useWrathAndGloryStore(({ totalIcons }) => totalIcons);
	const wrathDieResult: number[] = useWrathAndGloryStore(({ results }) => results[0]?.val);
	const isModalOpen = useWrathAndGloryStore(({ isModalOpen }) => isModalOpen);
	const closeModal: () => void = useWrathAndGloryStore(({ closeModal }) => closeModal);
	const selectedIds: number[] = useWrathAndGloryStore(({ selectedIds }) => selectedIds);
	const rerollAll: number[] = useWrathAndGloryStore(({ rerollAll }) => rerollAll);
	const rerollSelected: number[] = useWrathAndGloryStore(({ rerollSelected }) => rerollSelected);

	let wrathResultComment = '';
	if (wrathDieResult === 6) {
		wrathResultComment = ' (Critical)';
	} else if (wrathDieResult === 1) {
		wrathResultComment = ' (Complication)';
	}

	const handleRerollAll = () => {
		setIsRerolling(true);
		setTimeout(() => {
			rerollAll();
			setIsRerolling(false);
		}, 1000);
	};

	const handleRerollSelected = () => {
		setIsRerolling(true);
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
			<div className={styles.modalWrapper}>
			{isRerolling && <RerollOverlay />}
			<Modal.Header closeButton>
				<Modal.Title>Wrath and Glory Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.content}>
					<div className={styles.leftContent}>
						<ResultsTable />
					</div>
					<div className={styles.rightContent}>
						<ResultsGrid />
						<hr />
						<section className={styles.iconsResultsContainer}>
							<div className={styles.totalIconsContainer}>
								<div className={styles.totalIconsScore}>{totalIcons}</div>
								<div className={styles.iconsTextContainer}><span className={styles.totalText}>Total</span><br/><span className={styles.iconText}>Icons</span></div>
							</div>
							<div className={styles.iconsResultsData}>
								<div><strong>Exalted Icons</strong>: <CodeSpan>{exaltedIcons}</CodeSpan></div>
								<div><strong>Normal Icons</strong>: <CodeSpan>{normalIcons}</CodeSpan></div>
								<div><strong>Wrath Die</strong>: <CodeSpan>{wrathDieResult}</CodeSpan> {wrathResultComment ? <CodeSpan>{wrathResultComment}</CodeSpan> : null }</div>
							</div>
						</section>
						<hr/>
						<section className={styles.buttonsContainer}>
							<Button
								variant="outline-info"
								onClick={handleRerollAll}
							>Reroll all dice</Button>
							<Button
								variant="outline-primary"
								onClick={handleRerollSelected}
								disabled={selectedIds.length === 0}
							>Reroll selected</Button>
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
