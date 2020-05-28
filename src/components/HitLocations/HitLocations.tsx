import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './HitLocations.module.css';

type HitLocationsPropsType = {
	result: string
	hitLocation: string
	isDarkHeresy: boolean
}

type HitLocationTooltipProps = {
	result: number
}

function HitLocationTooltip({ isDarkHeresy }:any) {
	const key = 'HitLocationTooltip';
	const classNameFull = `${styles.cellIcon} ${styles.tooltip}`;
	const head = isDarkHeresy ? '01-10' : '01-09';
	const leftArm = isDarkHeresy ? '21-30' : '10-24';
	const rightArm = isDarkHeresy ? '11-20' : '25-44';
	const body = isDarkHeresy ? '31-70' : '45-79';
	const leftLeg = isDarkHeresy ? '86-00' : '80-89';
	const rightLeg = isDarkHeresy ? '71-85' : '90-00';
	console.log('HitLocationTooltip isDarkHeresy', isDarkHeresy)
	const tooltipBody = isDarkHeresy
		? (
			<>
				<div>
					<strong>{head}</strong> - <span>Head</span>
				</div>
				<div>
					<strong>{rightArm}</strong> - <span>Right Arm</span>
				</div>
				<div>
					<strong>{leftArm}</strong> - <span>Left Arm</span>
				</div>
				<div>
					<strong>{body}</strong> - <span>Body</span>
				</div>
				<div>
					<strong>{rightLeg}</strong> - <span>Right Leg</span>
				</div>
				<div>
					<strong>{leftLeg}</strong> - <span>Left Leg</span>
				</div>
			</>
		)
		: (
			<>
				<div>
					<strong>{head}</strong> - <span>Head</span>
				</div>
				<div>
					<strong>{leftArm}</strong> - <span>Secondary Arm</span>
				</div>
				<div>
					<strong>{rightArm}</strong> - <span>Primary Arm</span>
				</div>
				<div>
					<strong>{body}</strong> - <span>Body</span>
				</div>
				<div>
					<strong>{leftLeg}</strong> - <span>Left Leg</span>
				</div>
				<div>
					<strong>{rightLeg}</strong> - <span>Right Leg</span>
				</div>
			</>
		);
	return (
		<>
			<OverlayTrigger
				key={key}
				placement="top"
				delay={100}
				overlay={
					<Tooltip id={`tooltip-${key}`}>
						<div className={styles.hitLocationsTable}>
							<div>
								<strong>Hit Locations</strong>
							</div>
							<div className={styles.tooltipBody}>
								{ tooltipBody }
							</div>
						</div>
					</Tooltip>
				}
			><FontAwesomeIcon className={classNameFull} icon={faQuestionCircle} />
			</OverlayTrigger>
		</>
	);
}

function HitLocations({ result, hitLocation, isDarkHeresy }:HitLocationsPropsType) {
	console.log('gitLocations isDarkHeresy', isDarkHeresy)
	return (
		<Accordion className={styles.container}>
			<Card>
				<Accordion.Toggle as={Card.Header} className={`pointer ${styles.header}`} eventKey="0">
					<span>Hit Location <FontAwesomeIcon icon={faMale} /></span>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<div className={styles.body}>
							<span>{hitLocation}</span>
							<HitLocationTooltip isDarkHeresy={isDarkHeresy} />
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

export default HitLocations;