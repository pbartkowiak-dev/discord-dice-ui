// @ts-nocheck
import React, { FC } from 'react';
import useWrathAndGloryStore, { Result } from "./store";
import styles from './WrathAndGloryResultsModal.module.css';
import classNames from "classnames";
import Die from "./Die";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faSkull, faStar } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "../InfoTooltip/TooltipWrapper";

interface ResultRowProps {
	id: number;
	val: number;
	isSelected: boolean;
	isRerolled: boolean;
	isAdded: boolean;
	onClick: (id: number) => void;
}

const RerolledIcon: FC = () => (
	<TooltipWrapper content="Die rerolled">
		<FontAwesomeIcon icon={faRedoAlt} className={styles.extraIcon} />
	</TooltipWrapper>
);

const WrathIcon: FC = () => (
	<TooltipWrapper content="Wrath Die">
		<FontAwesomeIcon icon={faSkull} className={styles.extraIcon} />
	</TooltipWrapper>
);
const AddedIcon: FC = () => (
	<TooltipWrapper content="Die added (cannot be rerolled)">
		<FontAwesomeIcon icon={faStar} className={styles.extraIcon} />
	</TooltipWrapper>
);

const ResultRow: FC<ResultRowProps> = ({
	id,
	val,
	isSelected,
	onClick,
	isRerolled,
	isAdded,
	isWrathDie
}) => {
	const setHoverId: number[] = useWrathAndGloryStore(({ setHoverId }) => setHoverId);
	const hoverId: number[] = useWrathAndGloryStore(({ hoverId }) => hoverId);

	return (
		<div
			data-result-id={id}
			onMouseEnter={() => setHoverId(id)}
			onMouseLeave={() => setHoverId(null)}
			className={styles.resultsRowWrapper}>
			<div className={styles.extraIconsContainer}>
				{ isWrathDie && <WrathIcon /> }
				{ isRerolled && <RerolledIcon /> }
				{ isAdded && <AddedIcon /> }
			</div>
			<div
				onClick={() => onClick(id)}
				className={classNames({
					 [styles.pointer]: !isAdded,
					 [styles.hover]: hoverId === id,
					 [styles.notAllowed]: isAdded,
					 [styles.resultsRow]: true,
					 [styles.isSelected]: isSelected,
					 [styles.normalIcon]: val === 4 || val === 5,
					 [styles.exaltedIcon]: val === 6,
				 })}>
				<div className={styles.dieContainer}>
					<Die val={val} id={id} enableGlow={false} isWrathDie={isWrathDie} />
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
		</div>
	);
};

function ResultsTable() {
	const results: number[] = useWrathAndGloryStore(({ results }) => results);
	const exaltedIcons: number[] = useWrathAndGloryStore(({ exaltedIcons }) => exaltedIcons);
	const normalIcons: number[] = useWrathAndGloryStore(({ normalIcons }) => normalIcons);
	const toggleSelect: number[] = useWrathAndGloryStore(({ toggleSelect }) => toggleSelect);
	const selectedIds: number[] = useWrathAndGloryStore(({ selectedIds }) => selectedIds);

	const resultsSorted = [...results].sort((a: Result, b: Result) => b.val - a.val);

	const handleSelect = (id) => {
		toggleSelect(id);
	};

	return (
		<div className={styles.resultsTable}>
			{ (exaltedIcons > 0) && <span className={styles.exaltedExclamation}>Exalted!</span>}
			<div className={styles.resultsTableWrapper}>
				{
					resultsSorted
						.filter(({val}) => val === 6)
						.map(({ id, val, isRerolled, isAdded, isWrathDie }) => (
							<ResultRow
								id={id}
								val={val}
								onClick={() => handleSelect(id)}
								isSelected={selectedIds.includes(id)}
								isRerolled={isRerolled}
								isAdded={isAdded}
								isWrathDie={isWrathDie}
								key={id}
							/>
						))
				}
				{ (exaltedIcons > 0) && <div className={styles.divider} /> }
				{
					resultsSorted
						.filter(({val}) => val === 4 || val === 5)
						.map(({ id, val, isRerolled, isAdded, isWrathDie }) => (
							<ResultRow
								id={id}
								val={val}
								onClick={() => handleSelect(id)}
								isSelected={selectedIds.includes(id)}
								isRerolled={isRerolled}
								isAdded={isAdded}
								isWrathDie={isWrathDie}
								key={id}
							/>) )
				}
				{ (normalIcons > 0 && normalIcons + exaltedIcons < results.length) && <div className={styles.divider} /> }
				{
					resultsSorted
						.filter(({val}) => val < 4)
						.map(({ id, val, isRerolled, isAdded, isWrathDie }) => (
							<ResultRow
								id={id}
								val={val}
								onClick={() => handleSelect(id)}
								isSelected={selectedIds.includes(id)}
								isRerolled={isRerolled}
								isAdded={isAdded}
								isWrathDie={isWrathDie}
								key={id}
							/>) )
				}
			</div>
		</div>

	);
}

export default ResultsTable;
