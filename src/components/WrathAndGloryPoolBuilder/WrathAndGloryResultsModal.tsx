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

const WrathAndGloryResultsModal: FC = () => {
	const dispatch = useDispatch();
	const exaltedIcons: number[] = useWrathAndGloryStore(({ exaltedIcons }) => exaltedIcons);
	const normalIcons: number[] = useWrathAndGloryStore(({ normalIcons }) => normalIcons);
	const totalIcons: number[] = useWrathAndGloryStore(({ totalIcons }) => totalIcons);
	const isModalOpen = useWrathAndGloryStore(({ isModalOpen }) => isModalOpen);
	const closeModal: () => void = useWrathAndGloryStore(({ closeModal }) => closeModal);

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
						<section>
							<div><strong>Total Icons</strong>: {totalIcons}</div>
							<div><strong>Exalted Icons</strong>: {exaltedIcons}</div>
							<div><strong>Normal Icons</strong>: {normalIcons}</div>
							<div><strong>Wrath Die</strong>:</div>
							<div><strong>Complication</strong>: 1</div>
						</section>
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
