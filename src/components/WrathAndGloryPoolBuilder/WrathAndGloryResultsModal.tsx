// @ts-nocheck
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useWrathAndGloryStore, { Result } from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";

function ResultRow({ id, val }) {
	return (
		<div data-result-id={id} className={classNames({
			[styles.resultsRow]: true,
			[styles.normalIcon]: val === 4 || val === 5,
			[styles.exaltedIcon]: val === 6,
		})}>
			<div className={styles.dieContainer}>
				<div className={styles.die}>{val}</div>
			</div>
			<div className={styles.iconsContainer}>
				<div className={styles.modifier}>
					{(val === 6) && "+2"}
					{(val === 4 || val === 5) && "+1"}
					{(val) < 4  && "+0"}
				</div>
				<div className={styles.iconsText}>
					{(val) === 6 && "Icons"}
					{(val === 4 || val === 5) && "Icon"}
				</div>
			</div>
		</div>
	)
}

function WrathAndGloryResultsModal() {
	const dispatch = useDispatch();
	const results: number[] = useWrathAndGloryStore(({ results }) => results);
	const exaltedIcons: number[] = useWrathAndGloryStore(({ exaltedIcons }) => exaltedIcons);
	const showModal = useWrathAndGloryStore(({ isModalOpen }) => isModalOpen);
	const closeModal: () => void = useWrathAndGloryStore(({ closeModal }) => closeModal);

	const resultsSorted = results.sort((a: Result, b: Result) => b.val - a.val)


	return (
		<Modal show={showModal} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>Wrath and Glory Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.resultsTable}>
					{ exaltedIcons && exaltedIcons > 0 &&  <span className={styles.exaltedExclamation}>Exalted!</span>}
					<div className={styles.resultsTableWrapper}>
						{
							resultsSorted
								.filter(({val}) => val === 6)
								.map(({ id, val }) => <ResultRow id={id} val={val} key={id} /> )
						}
						<div className={styles.divider} />
						{
							resultsSorted
								.filter(({val}) => val === 4 || val === 5)
								.map(({ id, val }) => <ResultRow id={id} val={val} key={id} /> )
						}
						<div className={styles.divider} />
						{
							resultsSorted
								.filter(({val}) => val < 4)
								.map(({ id, val }) => <ResultRow id={id} val={val} key={id} /> )
						}
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
