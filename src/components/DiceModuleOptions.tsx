import React, { useState, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import DiceModuleForm from './DiceModuleForm';

function DiceModuleOptions() {
	return (
		<Accordion className="dice-module dice-options" defaultActiveKey="0">
			<Card>
				<Accordion.Toggle as={Card.Header} className="pointer" eventKey="0">
					<FontAwesomeIcon icon={faWrench} /> Roll Options
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