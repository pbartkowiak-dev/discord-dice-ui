// @ts-nocheck
import React, { FC, useCallback, useMemo } from 'react';
import useWrathAndGloryStore from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import Die from "./Die";

const ResultsGrid: FC<> = () => {
	const results: number[] = useWrathAndGloryStore(({ results }) => results);
	const toggleSelect: number[] = useWrathAndGloryStore(({ toggleSelect }) => toggleSelect);
	const positionMax: number[] = useWrathAndGloryStore(({ positionMax }) => positionMax);
	const setHoverId: number[] = useWrathAndGloryStore(({ setHoverId }) => setHoverId);
	const hoverId: number[] = useWrathAndGloryStore(({ hoverId }) => hoverId);

	const handleSelect = (id) => {
		toggleSelect(id);
	};

	const arr = useMemo(() => {
		return new Array(positionMax + 1).fill('_');
	}, [positionMax]);

	const onMouseEnter = useCallback((id: number) => {
		return () => {
			console.log('onMouseEnter', id)
			setHoverId(id);
		}
	}, []);

	const onMouseLeave = useCallback(() => {
		return () => setHoverId(null);
	}, []);

	const list = useMemo(() => {
		return arr.map((_, index) => {
			const result = results.filter(({ position }) => position === index )[0];

			if (result) {
				return (
					<div className={styles.gridCell}>
						<Die
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							hover={hoverId === result.id}
							val={result.val}
							isAdded={result.isAdded}
							id={result.id}
							enableGlow={true}
							style={result.style}
							onClick={handleSelect}
						/>
					</div>
				);
			}
			return <div className={styles.gridCell} />;
		});
	}, [results, arr, hoverId]);

	return (
		<div className={styles.resultsGridContainer}>
			<div className={styles.resultsGrid}>
				{ list }
			</div>
		</div>
	);
}

export default ResultsGrid;
