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
	style?: { [key: string]: string };
	isAdded: boolean;
	isWrathDie: boolean;
	onMouseEnter?: (id:  number) => void;
	onMouseLeave?: () => void;
	hover?: boolean;
}

const Die: FC<DieProps> = ({
	val,
	id,
	isAdded,
	isWrathDie,
	enableGlow,
	style,
	onClick,
	onMouseEnter,
	onMouseLeave,
	hover,
}) => {
	const selectedIds: number[] = useWrathAndGloryStore(({ selectedIds }) => selectedIds);
	const isSelected = selectedIds.includes(id)

	switch (val) {
		case 6: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					onMouseEnter={typeof onMouseEnter !== 'undefined' ? onMouseEnter(id) : null}
					onMouseLeave={typeof onMouseLeave !== 'undefined' ? onMouseLeave() : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isAdded,
						[styles.hover]: hover,
						[styles.notAllowed]: isAdded,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: isWrathDie,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 5: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					onMouseEnter={typeof onMouseEnter !== 'undefined' ? onMouseEnter(id) : null}
					onMouseLeave={typeof onMouseLeave !== 'undefined' ? onMouseLeave() : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isAdded,
						[styles.hover]: hover,
						[styles.notAllowed]: isAdded,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: isWrathDie,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}{dot}{dot}</div>
			);
		}
		case 4: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					onMouseEnter={typeof onMouseEnter !== 'undefined' ? onMouseEnter(id) : null}
					onMouseLeave={typeof onMouseLeave !== 'undefined' ? onMouseLeave() : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isAdded,
						[styles.hover]: hover,
						[styles.notAllowed]: isAdded,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: isWrathDie,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}{dot}</div>
			);
		}
		case 3: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					onMouseEnter={typeof onMouseEnter !== 'undefined' ? onMouseEnter(id) : null}
					onMouseLeave={typeof onMouseLeave !== 'undefined' ? onMouseLeave() : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isAdded,
						[styles.hover]: hover,
						[styles.notAllowed]: isAdded,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: isWrathDie,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}{dot}</div>
			);
		}
		case 2: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					onMouseEnter={typeof onMouseEnter !== 'undefined' ? onMouseEnter(id) : null}
					onMouseLeave={typeof onMouseLeave !== 'undefined' ? onMouseLeave() : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isAdded,
						[styles.hover]: hover,
						[styles.notAllowed]: isAdded,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: isWrathDie,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}{dot}</div>
			);
		}
		case 1: {
			return (
				<div
					onClick={typeof onClick !== 'undefined' ? () => onClick(id) : null}
					onMouseEnter={typeof onMouseEnter !== 'undefined' ? onMouseEnter(id) : null}
					onMouseLeave={typeof onMouseLeave !== 'undefined' ? onMouseLeave() : null}
					style={style}
					className={classNames({
						[styles.pointer]: !isAdded,
						[styles.hover]: hover,
						[styles.notAllowed]: isAdded,
						[styles.die]: true,
						[styles.isSelected]: isSelected,
						[styles[`die-${val}`]]: true,
						[styles.wrathDie]: isWrathDie,
						[styles.normalIconGlow]: enableGlow && (val === 4 || val === 5),
						[styles.exaltedIconGlow]: enableGlow && val === 6
					})}>{dot}</div>
			);
		}
	}
}

export default Die;
