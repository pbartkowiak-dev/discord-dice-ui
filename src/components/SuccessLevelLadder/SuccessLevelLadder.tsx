import React from 'react';
import classNames from 'classnames';
import Table from 'react-bootstrap/Table';
import { successLevelsType } from '../../utils/getSuccessLevels';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import tooltip from '../../locale/tooltip';
import styles from './SuccessLevelLadder.module.css';

type LadderPropsType = {
	successLevels: successLevelsType
}

function SuccessLevelLader({ successLevels }: LadderPropsType) {
	return (
		<Table className={styles.successLevelLadder} bordered>
			<tbody>
				<tr>
					<td className={classNames({
						[styles.successActive]: successLevels.isCriticalSuccess,
						[styles.cellInactive]: !successLevels.isCriticalSuccess
					})}>
						<div className={styles.cellContainer}>
							<span>Critical success</span>
							<InfoTooltip
								content={tooltip.critical}
								className={classNames({
									[styles.cellIcon]: true,
									[styles.successActive]: successLevels.isCriticalSuccess
								})}
							/>
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isExtremeSuccess ? styles.successActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Extreme success</span>
							<InfoTooltip
								content={tooltip.extreme}
								className={classNames({
									[styles.cellIcon]: true,
									[styles.successActive]: successLevels.isExtremeSuccess
								})}
							/>
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isHardSuccess ? styles.successActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Hard success</span>
							<InfoTooltip
								content={tooltip.hard}
								className={classNames({
									[styles.cellIcon]: true,
									[styles.successActive]: successLevels.isHardSuccess
								})}
							/>
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isRegularSuccess ? styles.successActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Regular success</span>
							<InfoTooltip
								content={tooltip.success}
								className={classNames({
									[styles.cellIcon]: true,
									[styles.successActive]: successLevels.isRegularSuccess
								})}
							/>
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isRegularFailure ? styles.failureActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Failure</span>
							<InfoTooltip
								content={tooltip.failure}
								className={classNames({
									[styles.cellIcon]: true,
									[styles.failureActive]: successLevels.isRegularFailure
								})}
							/>
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isFumble ? styles.failureActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Fumble</span>
							<InfoTooltip
								content={tooltip.fumble}
								className={classNames({
									[styles.cellIcon]: true,
									[styles.failureActive]: successLevels.isFumble
								})}
							/>
						</div>
					</td>
				</tr>
			</tbody>
		</Table>
	);
}

export default SuccessLevelLader;
