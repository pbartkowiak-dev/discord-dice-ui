import React from 'react';
import classNames from 'classnames';
import useWrathAndGloryStore from "./store";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./WrathDiceNumberSetter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CodeSpan from "../CodeSpan/CodeSpan";

function WrathDiceNumberSetter() {
	const wrathDiceNumber = useWrathAndGloryStore(({ wrathDiceNumber }) => wrathDiceNumber);
	const setWrathDiceNumber = useWrathAndGloryStore(({ setWrathDiceNumber }) => setWrathDiceNumber);

	return (
		<div className={styles.container}>
			<span>Set Wrath Dice Number (<CodeSpan>{wrathDiceNumber}</CodeSpan>):</span><ul className={styles.iconsRow}>
			<li className={classNames({
				[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber === 0,
			})}
				onClick={() => setWrathDiceNumber(0)}
			>
				<FontAwesomeIcon icon={faTimesCircle} />
			</li>
			<li className={classNames({
				[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber >= 1
			})}
				onClick={() => setWrathDiceNumber(1)}
			>
				<FontAwesomeIcon icon={faSkull} />
			</li>
			<li className={classNames({
				[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber >= 2
			})}
				onClick={() => setWrathDiceNumber(2)}
			>
				<FontAwesomeIcon icon={faSkull} />
			</li>
			<li className={classNames({
				[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber >= 3
			})}
				onClick={() => setWrathDiceNumber(3)}
			>
				<FontAwesomeIcon icon={faSkull} />
			</li>
			<li className={classNames({
			[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber >= 4
			})}
				onClick={() => setWrathDiceNumber(4)}
			>
				<FontAwesomeIcon icon={faSkull} />
			</li>
			<li className={classNames({
				[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber >= 5
			})}
				onClick={() => setWrathDiceNumber(5)}
			>
				<FontAwesomeIcon icon={faSkull} />
			</li>
			<li className={classNames({
				[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber >= 6
			})}
				onClick={() => setWrathDiceNumber(6)}
			>
				<FontAwesomeIcon icon={faSkull} />
			</li>
			<li className={classNames({
				[styles.iconContainer]: true,
				[styles.iconSelected]: wrathDiceNumber >= 7
			})}
				onClick={() => setWrathDiceNumber(7)}
			>
				<FontAwesomeIcon icon={faSkull} />
			</li>
		</ul>
		</div>
	);
}

export default WrathDiceNumberSetter;
