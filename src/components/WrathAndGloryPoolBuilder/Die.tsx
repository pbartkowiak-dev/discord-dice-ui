// @ts-nocheck
import React, { FC } from 'react';
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import useWrathAndGloryStore from "./store";

const dot = <FontAwesomeIcon icon={faCircle} className={styles.dot}/>

interface DieProps {
	val: number;
	id: number;
	enableGlow: boolean;
	onClick?: (id: number) => void;
	style?: { [key: string]: string }
}

const Die: FC<DieProps> = ({ val, id, enableGlow,style, onClick }) => {
	const selectedIds: number[] = useWrathAndGloryStore(({ selectedIds }) => selectedIds);
	const isRerolled: number[] = useWrathAndGloryStore(({ isRerolled }) => isRerolled);
	const isSelected = selectedIds.includes(id)

	switch (val) {
		case 6: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isRerolled,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: id === 0,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 5: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isRerolled,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: id === 0,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 4: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isRerolled,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: id === 0,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}{dot}</div>
			);
		}
		case 3: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isRerolled,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: id === 0,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}</div>
			);
		}
		case 2: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isRerolled,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: id === 0,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}</div>
			);
		}
		case 1: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isRerolled,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: id === 0,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}</div>
			);
		}
	}
}

export default Die;
