// @ts-nocheck
import React, { FC, useState } from 'react';
import useWrathAndGloryStore, { Result } from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";
import Die from "./Die";

const ResultsGrid: FC<> = ({ id }) => {
	const results: number[] = useWrathAndGloryStore(({ results }) => results);
	const toggleSelect: number[] = useWrathAndGloryStore(({ toggleSelect }) => toggleSelect);
	const selectedIds: number[] = useWrathAndGloryStore(({ selectedIds }) => selectedIds);
	const positionMax: number[] = useWrathAndGloryStore(({ positionMax }) => positionMax);

	const handleSelect = (id) => {
		toggleSelect(id);
	};

	return (
		<div className={styles.resultsGridContainer}>
			<div className={styles.resultsGrid}>
				{ new Array(positionMax).fill('_').map((_, index) => {
					const result = results.filter(({ position }) => position === index )[0];

					if (result) {
						return (
							<div className={styles.gridCell}>
								<Die
									val={result.val}
									id={result.id}
									rotate={true}
									isSelected={selectedIds.includes(result.id)}
									onClick={handleSelect}
								/>
							</div>
						);
					}
					return <div className={styles.gridCell} />;
				})}
			</div>
		</div>
	);
}

export default ResultsGrid;
