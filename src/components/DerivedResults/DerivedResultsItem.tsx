import React from 'react';
import TooltipWrapper from '../InfoTooltip/TooltipWrapper';
import { DerivedResultsItemTypes } from './DerivedResultsTypes';
import styles from './DerivedResults.module.css';

function DerivedResultsItem({
	symbolCount,
	symbolType,
	tooltipContent,
	symbolImageName
}: DerivedResultsItemTypes) {
	return (
		<div className={styles.derivedResultsItem} key={`${symbolCount}_${symbolType}`}>
			<TooltipWrapper content={`${tooltipContent || symbolType} (${symbolCount})`}>
				<div>
					<img
						className={styles.derivedResultsImage}
						src={require(`../../img/${symbolImageName}.png`)}
						alt={symbolType}
					/>
					<div className={styles.derivedResultsCounter}>
						<span>{symbolCount}</span>
					</div>
				</div>
			</TooltipWrapper>
		</div>
	);
}

export default DerivedResultsItem;
