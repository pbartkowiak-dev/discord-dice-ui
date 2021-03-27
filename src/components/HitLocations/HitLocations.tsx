import React from 'react';
import classNames from 'classnames';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import styles from './HitLocations.module.css';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

interface HitLocationsPropsType {
	hitLocation: string;
	isDarkHeresy?: boolean;
	isWarhammer2e?: boolean;
	isConan?: boolean;
	isInfinity?: boolean;
	alwaysExpanded?: boolean;
}

function HitLocationTooltip({ isDarkHeresy, isWarhammer2e, isConan, isInfinity }: any) {
	let head;
	let leftArm;
	let rightArm;
	let body;
	let leftLeg;
	let rightLeg;
	let tooltipBody;

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
	} else if (isConan) {
		head = '01-02';
		rightArm = '03-05';
		leftArm = '06-08';
		body = '09-14';
		rightLeg = '15-17';
		leftLeg = '18-20';
	} else if (isInfinity) {
		head = '01-02';
		rightArm = '03-05';
		leftArm = '06-08';
		body = '09-14';
		rightLeg = '15-17';
		leftLeg = '18-20';
	} else {
		head = '01-09';
		leftArm = '10-24';
		rightArm = '25-44';
		body = '45-79';
		leftLeg = '80-89';
		rightLeg = '90-00';
	}

	if (isDarkHeresy || isWarhammer2e) {
		tooltipBody = <>
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
	} else if (isConan) {
		tooltipBody = <>
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
				<strong>{body}</strong> - <span>Torso</span>
			</div>
			<div>
				<strong>{rightLeg}</strong> - <span>Right Leg</span>
			</div>
			<div>
				<strong>{leftLeg}</strong> - <span>Left Leg</span>
			</div>
		</>
	} else if (isInfinity) {
		tooltipBody = <>
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
				<strong>{body}</strong> - <span>Torso</span>
			</div>
			<div>
				<strong>{rightLeg}</strong> - <span>Right Leg</span>
			</div>
			<div>
				<strong>{leftLeg}</strong> - <span>Left Leg</span>
			</div>
		</>
	} else {
		// default to Warhammer 4e
		tooltipBody = <>
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
	}

	const tooltipContent = (
		<div className={styles.hitLocationsTable}>
			<div>
				<strong>Hit Locations</strong>
			</div>
			<div className={styles.tooltipBody}>
				{ tooltipBody }
			</div>
		</div>
	);

	return <InfoTooltip
		content={tooltipContent}
		className={classNames({
			[styles.cellIcon] : true,
			[styles.tooltip] : true
		})}
	/>;
}

function HitLocations({
	hitLocation,
	isDarkHeresy,
	isWarhammer2e,
	isConan,
	isInfinity,
	alwaysExpanded
}: HitLocationsPropsType) {
	let header;

	if (alwaysExpanded) {
		header = (
			<Card.Header className={styles.header}>
				<span>Hit Location <FontAwesomeIcon icon={faMale} /></span>
			</Card.Header>
		);
	} else {
		header = (
			<Accordion.Toggle as={Card.Header} className={ classNames({pointer: true, [styles.header]: true }) } eventKey="0">
				<span>Hit Location <FontAwesomeIcon icon={faMale} /></span>
			</Accordion.Toggle>
		);
	}

	return (
		<Accordion
			className={styles.container}
			defaultActiveKey={(alwaysExpanded) ? "0" : "666"} 
		>
			<Card>
				{ header }
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<div className={styles.body}>
							<span>{hitLocation}</span>
							<HitLocationTooltip
								isDarkHeresy={isDarkHeresy}
								isWarhammer2e={isWarhammer2e}
								isConan={isConan}
								isInfinity={isInfinity}
							/>
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

export default HitLocations;
