import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import CodeSpan from '../CodeSpan/CodeSpan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './HitLocations.module.css';

type HitLocationsPropsType = {
	result: string
	hitLocation: string
}

type HitLocationTooltipProps = {
	result: number
}

function HitLocationTooltip() {
	const key = 'HitLocationTooltip';
	const classNameFull = `${styles.cellIcon} ${styles.tooltip}`;
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
							<div>
								<strong>01-09</strong> - <span>Head</span>
							</div>
							<div>
								<strong>10-24</strong> - <span>Secondary Arm</span>
							</div>
							<div>
								<strong>25-44</strong> - <span>Primary Arm</span>
							</div>
							<div>
								<strong>45-79</strong> - <span>Body</span>
							</div>
							<div>
								<strong>80-89</strong> - <span>Left Leg</span>
							</div>
							<div>
								<strong>90-00</strong> - <span>Right Leg</span>
							</div>
						</div>
					</div>
				</Tooltip>
			}
		><FontAwesomeIcon className={classNameFull} icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

function HitLocations({ result, hitLocation }:HitLocationsPropsType) {
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
							<HitLocationTooltip/>
						</div>
						
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}



export default HitLocations;