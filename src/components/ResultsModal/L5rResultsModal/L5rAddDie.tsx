import React from 'react';
import TooltipWrapper from '../../InfoTooltip/TooltipWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
	EXPLOSIVE_SUCCESS,
	OPPORTUNITY,
	STRIFE,
	SUCCESS
} from '../../../consts/l5rSymbols';
import {
	ExplosiveSuccessImg,
	OpportunityImg,
	StrifeImg,
	SuccessImg,
	BlackRingImg
} from './L5rDropdownSymbols';
import { Dropdown } from 'react-bootstrap';
import l5rStyles from './L5rResultsModal.module.css';
import { RING_DIE } from '../../../consts/diceConstants';
import { ROLLED_DIE } from '../../../consts/consts';

function L5rResultsDropdown({
	type,
	l5rAddDie,
	l5rSendState
}: any) {
	const handleAddDie = (setTo?: string) => {
		if (setTo) {
			l5rAddDie({
				type,
				setTo: `${setTo}_${RING_DIE}`
			});
		} else {
			l5rAddDie({
				type,
				setTo: ''
			});
		}
		l5rSendState();
	};

	const dieTypeString = type === ROLLED_DIE ? 'rolled' : 'kept';

	return (
		<Dropdown className="dropdown-wrapper">
			<Dropdown.Toggle id="add-die-dropdown">
				<TooltipWrapper content={`Add a die`}>
					<div className={l5rStyles.addDieContainer}>
						<div className={l5rStyles.addDie}>
							<div className={l5rStyles.addDieInner}>
								<FontAwesomeIcon className={l5rStyles.addDieIcon} icon={faPlus} />
							</div>
						</div>
					</div>
				</TooltipWrapper>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onClick={() => handleAddDie()}>Roll a new {BlackRingImg} die</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item onClick={() => handleAddDie(`${OPPORTUNITY}_${STRIFE}`)}>Add a {dieTypeString} {BlackRingImg} set to {OpportunityImg} {StrifeImg}</Dropdown.Item>
				<Dropdown.Item onClick={() => handleAddDie(`${OPPORTUNITY}`)}>Add a {dieTypeString} {BlackRingImg} set to {OpportunityImg}</Dropdown.Item>
				<Dropdown.Item onClick={() => handleAddDie(`${SUCCESS}_${STRIFE}`)}>Add a {dieTypeString} {BlackRingImg} set to {SuccessImg} {StrifeImg}</Dropdown.Item>
				<Dropdown.Item onClick={() => handleAddDie(`${SUCCESS}`)}>Add a {dieTypeString} {BlackRingImg} set to {SuccessImg}</Dropdown.Item>
				<Dropdown.Item onClick={() => handleAddDie(`${EXPLOSIVE_SUCCESS}_${STRIFE}`)}>Add a {dieTypeString} {BlackRingImg} set to {ExplosiveSuccessImg} {StrifeImg}</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default L5rResultsDropdown;
