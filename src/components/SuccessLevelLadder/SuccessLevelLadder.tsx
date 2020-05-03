import React from 'react';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './SuccessLevelLadder.module.css'
import { successLevelsType } from '../../utils/getSuccessLevels';

type LadderPropsType = {
	successLevels: successLevelsType
}

type LevelSuccessTooltipProps = {
	contentMsg: any 
}

function LevelSuccessTooltip({contentMsg}:LevelSuccessTooltipProps) {
	const key = 'LevelSuccessTooltip';
	const classNameFull = `${styles.cellIcon}`;
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="top"
			delay={100}
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					<span>{ contentMsg }</span>
				</Tooltip>
			}
		><FontAwesomeIcon className={classNameFull} icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

function SuccessLevelLader({ successLevels }: LadderPropsType) {
	return (
		<Table className={styles.successLevelLadder} bordered>
			<tbody>
				<tr>
					<td className={ successLevels.isCriticalSuccess ? styles.successActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Critical success</span>
							<LevelSuccessTooltip contentMsg={ <span>A roll of <strong>01</strong>.</span> } />
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isExtremeSuccess ? styles.successActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Extreme success</span>
							<LevelSuccessTooltip contentMsg={ <span>The roll is equal to or below <strong>a&nbsp;half</strong> of the character’s skill or characteristic.</span> } />
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isHardSuccess ? styles.successActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Hard success</span>
							<LevelSuccessTooltip contentMsg={ <span>The roll is equal to or below <strong>a&nbsp;fifth</strong> of the character’s skill or characteristic.</span> } />
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isRegularSuccess ? styles.successActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Regular success</span>
							<LevelSuccessTooltip contentMsg={ <span>The roll is <strong>below</strong> the character’s skill or characteristic.</span> } />
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isRegularFailure ? styles.failureActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Failure</span>
							<LevelSuccessTooltip contentMsg={ <span>The roll is <strong>above</strong> the character’s skill or characteristic (but not a fumble).</span> } />
						</div>
					</td>
				</tr>
				<tr>
					<td className={ successLevels.isFumble ? styles.failureActive : styles.cellInactive }>
						<div className={styles.cellContainer}>
							<span>Fumble</span>
							<LevelSuccessTooltip contentMsg={ <span>The roll is <strong>100</strong>. If the roll required for success is less than 50, a roll of <strong>96 or over</strong> is a fumble.</span> } />
						</div>
					</td>
				</tr>
			</tbody>
		</Table>
	);
}



export default SuccessLevelLader;