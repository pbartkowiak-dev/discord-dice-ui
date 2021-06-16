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
import getRandom from "../../utils/getRandom";

const dot = <FontAwesomeIcon icon={faCircle} className={styles.dot}/>

interface GetDotDie {
	val: number;
	id: number;
	rotate: boolean;
	isSelected: boolean;
	onClick: (id: number) => void;
}

function getDotDie({ val, id, rotate, isSelected, onClick }: GetDotDie) {
	let style = {};

	if (rotate) {
		style = {
			transform: `rotate(${getRandom(90, -90)}deg) scale(0.9)`
		}
	}

	switch (val) {
		case 6: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
					[styles.die]: true,
					[styles.isSelected]: isSelected,
					[styles[`die-${val}`]]: true,
					[styles.wrathDie]: id === 0,
					[styles.normalIconGlow]: val === 4 || val === 5,
					[styles.exaltedIconGlow]: val === 6
				})}>{dot}{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 5: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
					[styles.die]: true,
					[styles.isSelected]: isSelected,
					[styles[`die-${val}`]]: true,
					[styles.wrathDie]: id === 0,
					[styles.normalIconGlow]: val === 4 || val === 5,
					[styles.exaltedIconGlow]: val === 6
				})}>{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 4: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
					[styles.die]: true,
					[styles.isSelected]: isSelected,
					[styles[`die-${val}`]]: true,
					[styles.wrathDie]: id === 0,
					[styles.normalIconGlow]: val === 4 || val === 5,
					[styles.exaltedIconGlow]: val === 6
				})}>{dot}{dot}{dot}{dot}</div>
			);
		}
		case 3: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
					[styles.die]: true,
					[styles.isSelected]: isSelected,
					[styles[`die-${val}`]]: true,
					[styles.wrathDie]: id === 0,
					[styles.normalIconGlow]: val === 4 || val === 5,
					[styles.exaltedIconGlow]: val === 6
				})}>{dot}{dot}{dot}</div>
			);
		}
		case 2: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
					[styles.die]: true,
					[styles.isSelected]: isSelected,
					[styles[`die-${val}`]]: true,
					[styles.wrathDie]: id === 0,
					[styles.normalIconGlow]: val === 4 || val === 5,
					[styles.exaltedIconGlow]: val === 6
				})}>{dot}{dot}</div>
			);
		}
		case 1: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
					[styles.die]: true,
					[styles.isSelected]: isSelected,
					[styles[`die-${val}`]]: true,
					[styles.wrathDie]: id === 0,
					[styles.normalIconGlow]: val === 4 || val === 5,
					[styles.exaltedIconGlow]: val === 6
				})}>{dot}</div>
			);
		}
	}
}

function ResultRow({ id, val, isSelected, onClick }) {
	return (
		<div data-result-id={id}
			 onClick={() => onClick(id)}
			 className={classNames({
				[styles.resultsRow]: true,
				[styles.isSelected]: isSelected,
				[styles.normalIcon]: val === 4 || val === 5,
				[styles.exaltedIcon]: val === 6,
			}
		)}>
			<div className={styles.dieContainer}>
				<div className={styles.die}>{getDotDie({ val, id })}</div>
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
	const toggleSelect: number[] = useWrathAndGloryStore(({ toggleSelect }) => toggleSelect);
	const selectedIds: number[] = useWrathAndGloryStore(({ selectedIds }) => selectedIds);
	const positionMax: number[] = useWrathAndGloryStore(({ positionMax }) => positionMax);
	const isModalOpen = useWrathAndGloryStore(({ isModalOpen }) => isModalOpen);
	const closeModal: () => void = useWrathAndGloryStore(({ closeModal }) => closeModal);

	const resultsSorted = results.sort((a: Result, b: Result) => b.val - a.val);

	const handleSelect = (id) => {
		toggleSelect(id);
	};

	return (
		<Modal show={isModalOpen} onHide={closeModal}>
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
									.map(({ id, val }) => (
										<ResultRow
											id={id}
											val={val}
											onClick={handleSelect}
											isSelected={selectedIds.includes(id)}
											key={id}
										/>) )
							}
							{ (exaltedIcons > 0) && <div className={styles.divider} /> }
							{
								resultsSorted
									.filter(({val}) => val === 4 || val === 5)
									.map(({ id, val }) => (
										<ResultRow
											id={id}
											val={val}
											onClick={handleSelect}
											isSelected={selectedIds.includes(id)}
											key={id}
										/>) )
							}
							{ (normalIcons > 0 && normalIcons + exaltedIcons / 2 < results.length) && <div className={styles.divider} /> }
							{
								resultsSorted
									.filter(({val}) => val < 4)
									.map(({ id, val }) => (
										<ResultRow
											id={id}
											val={val}
											onClick={handleSelect}
											isSelected={selectedIds.includes(id)}
											key={id}
										/>) )
							}
						</div>
					</div>
					{/*	GRID*/}
					<div className={styles.resultsGridContainer}>
						<div className={styles.resultsGrid}>
							{ new Array(positionMax).fill('_').map((_, index) => {
								const result = results.filter(({ position }) => position === index )[0];

								if (result) {
									return (
										<div className={styles.gridCell}>
											{getDotDie({
												val: result.val,
												id: result.id,
												rotate: true,
												isSelected: selectedIds.includes(result.id),
												onClick: handleSelect
											})}
										</div>);
								}
								return <div className={styles.gridCell} />;
							})}
						</div>
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
