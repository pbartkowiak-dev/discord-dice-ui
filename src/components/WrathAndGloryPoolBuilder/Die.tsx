// @ts-nocheck
import React, { FC, useState } from 'react';
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import getRandom from "../../utils/getRandom";

const dot = <FontAwesomeIcon icon={faCircle} className={styles.dot}/>

interface DieProps {
	val: number;
	id: number;
	rotate?: boolean;
	isSelected?: boolean;
	onClick?: (id: number) => void;
}

const Die: FC<DieProps> = ({ val, id, rotate, isSelected, onClick }) => {
	let style = {};

	if (rotate) {
		style = {
			transform: `rotate(${getRandom(90, -90)}deg) scale(0.9)`
		};
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

export default Die;
