// @ts-nocheck
import React, { FC } from 'react';
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useWrathAndGloryStore, { Result } from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";
import ResultsGrid from "./ResultsGrid";
import ResultsTable from "./ResultsTable";
import rollAndKeepStyles from "../RollAndKeepResultsModal/RollAndKeepResultsModal.module.css";
import CodeSpan from "../CodeSpan/CodeSpan";

const WrathAndGloryResultsModal: FC = () => {
	const dispatch = useDispatch();
	const exaltedIcons: number[] = useWrathAndGloryStore(({ exaltedIcons }) => exaltedIcons);
	const normalIcons: number[] = useWrathAndGloryStore(({ normalIcons }) => normalIcons);
	const totalIcons: number[] = useWrathAndGloryStore(({ totalIcons }) => totalIcons);
	const wrathDieResult: number[] = useWrathAndGloryStore(({ results }) => results[0]?.val);
	const isModalOpen = useWrathAndGloryStore(({ isModalOpen }) => isModalOpen);
	const closeModal: () => void = useWrathAndGloryStore(({ closeModal }) => closeModal);

	let wrathResultComment = '';
	if (wrathDieResult === 6) {
		wrathResultComment = ' (Critical)';
	} else if (wrathDieResult === 1) {
		wrathResultComment = ' (Complication)';
	}

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
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
								<div><strong>Wrath Die</strong>: <CodeSpan>{wrathDieResult}{wrathResultComment}</CodeSpan></div>
							</div>
						</section>
						<hr/>
						<section className={styles.buttonsContainer}>
							<Button
								variant="outline-info"
							>Reroll all dice</Button>
							<Button
								variant="outline-primary"
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
		</Modal>
	);
}

export default WrathAndGloryResultsModal;
