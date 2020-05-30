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
	isWarhammer2e: boolean
}

type HitLocationTooltipProps = {
	result: number
}

function HitLocationTooltip({ isDarkHeresy, isWarhammer2e }:any) {
	const key = 'HitLocationTooltip';
	const classNameFull = `${styles.cellIcon} ${styles.tooltip}`;
	let head;
	let leftArm;
	let rightArm;
	let body;
	let leftLeg;
	let rightLeg;

	if (isDarkHeresy) {
		head = '01-10';
		rightArm = '11-20';
		leftArm = '21-30';
		body = '31-70';
		rightLeg = '71-85';
		leftLeg = '86-00';
	} else if (isWarhammer2e) {
		head = '01-15';
		rightArm = '16-35';
		leftArm = '36-55';
		body = '56-80';
		rightLeg = '81-90';
		leftLeg = '91-00';
	} else {
		head = '01-09';
		leftArm = '10-24';
		rightArm = '25-44';
		body = '45-79';
		leftLeg = '80-89';
		rightLeg = '90-00';
	}

	const tooltipBody = (isDarkHeresy || isWarhammer2e)
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

function HitLocations({ result, hitLocation, isDarkHeresy, isWarhammer2e }:HitLocationsPropsType) {
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
							<HitLocationTooltip
								isDarkHeresy={isDarkHeresy}
								isWarhammer2e={isWarhammer2e} />
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

export default HitLocations;