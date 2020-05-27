import React from 'react';
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './WarhammerReroll.module.css';

const rerollInfo = 'A reroll is when you disregard the result of a dice roll, and roll it again. Once a Test has been rerolled, it cannot be rerolled again under normal circumstances.';

type RerollInfoTooltipPropType = {
	text: string
}

function RerollInfoTooltip({ text }:RerollInfoTooltipPropType) {
	const key = 'RerollInfoTooltip';
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

function WarhammerReroll({ handleReroll }:any) {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.row}>
					<Button variant="outline-primary"
						onClick={ handleReroll }
						>Reroll</Button>
					<RerollInfoTooltip text={rerollInfo} />
				</div>
			</div>
		</>
	);
}

export default WarhammerReroll;