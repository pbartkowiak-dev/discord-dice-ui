// @ts-nocheck
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useWrathAndGloryStore, { Result } from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const dot = <FontAwesomeIcon icon={faCircle} className={styles.dot}/>

function getDotDie(val: nuber) {
	switch (val) {
		case 6: {
			return (
				<div className={classNames(styles.die, styles[`die-${val}`])}>{dot}{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 5: {
			return (
				<div className={classNames(styles.die, styles[`die-${val}`])}>{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 4: {
			return (
				<div className={classNames(styles.die, styles[`die-${val}`])}>{dot}{dot}{dot}{dot}</div>
			);
		}
		case 3: {
			return (
				<div className={classNames(styles.die, styles[`die-${val}`])}>{dot}{dot}{dot}</div>
			);
		}
		case 2: {
			return (
				<div className={classNames(styles.die, styles[`die-${val}`])}>{dot}{dot}</div>
			);
		}
		case 1: {
			return (
				<div className={classNames(styles.die, styles[`die-${val}`])}>{dot}</div>
			);
		}
	}
}

function ResultRow({ id, val }) {
	return (
		<div data-result-id={id} className={classNames({
			[styles.resultsRow]: true,
			[styles.normalIcon]: val === 4 || val === 5,
			[styles.exaltedIcon]: val === 6,
		})}>
			<div className={styles.dieContainer}>
				<div className={styles.die}>{getDotDie(val)}</div>
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
	const normalIcons: number[] = useWrathAndGloryStore(({ normalIcons }) => normalIcons);
	const totalIcons: number[] = useWrathAndGloryStore(({ totalIcons }) => totalIcons);
	const showModal = useWrathAndGloryStore(({ isModalOpen }) => isModalOpen);
	const closeModal: () => void = useWrathAndGloryStore(({ closeModal }) => closeModal);

	const resultsSorted = results.sort((a: Result, b: Result) => b.val - a.val)

	return (
		<Modal show={showModal} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>Wrath and Glory Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.content}>
					{/* RESULTS TABLE */}
					<div className={styles.resultsTable}>
						{ (exaltedIcons > 0) && <span className={styles.exaltedExclamation}>Exalted!</span>}
						<div className={styles.resultsTableWrapper}>
							{
								resultsSorted
									.filter(({val}) => val === 6)
									.map(({ id, val }) => <ResultRow id={id} val={val} key={id} /> )
							}
							{ (exaltedIcons > 0) && <div className={styles.divider} /> }
							{
								resultsSorted
									.filter(({val}) => val === 4 || val === 5)
									.map(({ id, val }) => <ResultRow id={id} val={val} key={id} /> )
							}
							{ (normalIcons > 0 && (normalIcons + exaltedIcons < resultsSorted.length)) && <div className={styles.divider} /> }
							{
								resultsSorted
									.filter(({val}) => val < 4)
									.map(({ id, val }) => <ResultRow id={id} val={val} key={id} /> )
							}
						</div>
					</div>
					{/*	GRID*/}
					<div className={styles.resultsGrid}>
						{ new Array(36).fill('0').map(_ => (
							<div className={styles.gridCell}>{getDotDie(6)}</div>
						))}
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
