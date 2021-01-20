import React from 'react';
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
	SuccessImg
} from './L5rDropdownSymbols';
import { RING_DIE } from '../../../consts/diceConstants';
import { Dropdown } from 'react-bootstrap';

function L5rResultsDropdown({
	index,
	result,
	wasAlreadyExploded,
	children,
	l5rAlterDie,
	l5rRollAdditionalDie,
	isModifyingAllowed,
	l5rSendState,
	type
}: any) {
	const isExplosiveDie = result.includes(EXPLOSIVE_SUCCESS);

	const handleRollAdditionalDie = () => {
		l5rRollAdditionalDie({ index, result, type });
	};

	const handleAlterDie = (setTo: string) => {
		l5rAlterDie({
			index,
			setTo: `${setTo}_${RING_DIE}`
		});
		l5rSendState();
	};

	if ((!isExplosiveDie && !isModifyingAllowed) || wasAlreadyExploded) {
		return <>{ children }</>;
	}

	return (
		<Dropdown className="dropdown-wrapper">
			<Dropdown.Toggle id="kept-die-dropdown">
				{ children }
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{ (isExplosiveDie && !isModifyingAllowed) && <Dropdown.Item onClick={handleRollAdditionalDie}>Roll additional die</Dropdown.Item> }
				{ isModifyingAllowed && <Dropdown.Item onClick={() => handleAlterDie(`${OPPORTUNITY}_${STRIFE}`)}>Set to {OpportunityImg} {StrifeImg}</Dropdown.Item> }
				{ isModifyingAllowed && <Dropdown.Item onClick={() => handleAlterDie(`${OPPORTUNITY}`)}>Set to {OpportunityImg}</Dropdown.Item> }
				{ isModifyingAllowed && <Dropdown.Item onClick={() => handleAlterDie(`${SUCCESS}_${STRIFE}`)}>Set to {SuccessImg} {StrifeImg}</Dropdown.Item> }
				{ isModifyingAllowed && <Dropdown.Item onClick={() => handleAlterDie(`${SUCCESS}`)}>Set to {SuccessImg}</Dropdown.Item> }
				{ isModifyingAllowed && <Dropdown.Item onClick={() => handleAlterDie(`${EXPLOSIVE_SUCCESS}_${STRIFE}`)}>Set to {ExplosiveSuccessImg} {StrifeImg}</Dropdown.Item> }
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default L5rResultsDropdown;
