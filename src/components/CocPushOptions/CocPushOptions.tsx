import React from 'react';
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import CodeSpan from '../CodeSpan/CodeSpan';
import styles from './CocPushOptions.module.css';

const pushInfo = 'Only skill and characteristic rolls can be pushed, not Luck, Sanity, or combat rolls, or rolls to determine an amount of damage or Sanity loss.';
const luckInfo = 'Luck points may not be spent on Luck rolls, damage rolls, Sanity rolls, or rolls to determine the amount of Sanity points lost.';

type InfoTooltipPropType = {
	text: string
}

function InfoTooltip({ text }:InfoTooltipPropType) {
	const key = 'InfoTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="top"
			delay={100}
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					<span>{ text }</span>
				</Tooltip>
			}
		><FontAwesomeIcon className={styles.infoIcon} icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

function CocPushOptions({ 
	handlePushRoll,
	luckRequired
 }:any) {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.row}>
					<Button variant="outline-primary"
						onClick={ handlePushRoll }
						>Push the Roll</Button>
					<InfoTooltip text={pushInfo} />
				</div>
				<div className={styles.orContainer}>
					<span className={styles.or}>or</span>
				</div>
				<div className={styles.row}>
					<span>Spend <CodeSpan>{ luckRequired }</CodeSpan> Luck Points</span>
					<InfoTooltip text={luckInfo} />
				</div>
			</div>
		</>
	);
}

export default CocPushOptions;