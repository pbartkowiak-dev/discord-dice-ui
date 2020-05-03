import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faCircle } from '@fortawesome/free-solid-svg-icons';
import DiceModuleForm from './DiceModuleForm';
import styles from './DiceModule.module.css';

function DiceModuleOptions({ rollOptions }:any) {
	console.log('DiceModuleOptions rollOptions', rollOptions)
	const hasAnyOptionActive = !!Object.values(rollOptions).filter(value => value).length;
	const titleClass = `${ hasAnyOptionActive ? `${styles.title} ${styles.active}` : styles.title }`;
	const indicator = <span className={styles.indicator}><FontAwesomeIcon icon={faCircle} /></span>
	return (
		<Accordion className="dice-module dice-options" defaultActiveKey="0">
			<Card>
				<Accordion.Toggle as={Card.Header} className="pointer" eventKey="0">
					<span className={titleClass}>
						<FontAwesomeIcon icon={faWrench} /> Roll Options { hasAnyOptionActive ? indicator : null }
					</span>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<DiceModuleForm/>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

export default DiceModuleOptions;