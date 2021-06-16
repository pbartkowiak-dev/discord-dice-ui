// @ts-nocheck
import React, { FC } from 'react';
import useWrathAndGloryStore, { Result } from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import CodeSpan from "../CodeSpan/CodeSpan";

const IconsResultsContainer: FC = () => {
const exaltedIcons: number[] = useWrathAndGloryStore(({ exaltedIcons }) => exaltedIcons);
	const normalIcons: number[] = useWrathAndGloryStore(({ normalIcons }) => normalIcons);
	const totalIcons: number[] = useWrathAndGloryStore(({ totalIcons }) => totalIcons);
	const wrathDieResult: number[] = useWrathAndGloryStore(({ results }) => results[0]?.val);

	let wrathResultComment = '';
	if (wrathDieResult === 6) {
		wrathResultComment = ' (Critical)';
	} else if (wrathDieResult === 1) {
		wrathResultComment = ' (Complication)';
	}

	return (
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
	);
}

export default IconsResultsContainer;
