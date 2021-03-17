// @ts-nocheck
import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faTimes } from '@fortawesome/free-solid-svg-icons';
import './InfinityModalForm.css';

function InfinityDiceRow({
	dice,
	diceMax,
	fortune,
	hoverState,
	handleOnHover,
	handleOnClick,
	isAssistance
}: any) {
	const diceRow = new Array(diceMax).fill('x').map((_, index) => {
		const diceAmount = index + 1;
		return (
			<div key={`die-to-roll-${diceAmount}`} className="infinity-die-select">
				<div className="die-container">
					<FontAwesomeIcon className={classNames({
						'dice-icon': true,
						'dice-icon--assistance': isAssistance,
						active: Number(dice) >= diceAmount,
						hovered: hoverState >= diceAmount
					})}
						icon={faDiceD20}
						onMouseEnter={() => handleOnHover(`${diceAmount}`)}
						onMouseLeave={() => handleOnHover(0)}
						onClick={() => handleOnClick(`${diceAmount}`)}
					/>
					<span className={classNames({
						hidden: diceAmount < 3 || diceAmount > 5,
						'die-fortune-point': true,
						show: Number(fortune) >= diceAmount - 2 // one, two or thee fortune points
					})}>1</span>
				</div>
				<label className="dice-row-label" key={`dice-row-label-${index}`}>
					<Field
						name="dice"
						component="input"
						type="radio"
						value={`${diceAmount}`}
						onClick={() => handleOnClick(`${diceAmount}`)}
					/>
						<span className={classNames({
							'die-label--active': Number(dice) === diceAmount,
							'die-label--assistance': isAssistance
						})}>{diceAmount}d20</span>
				</label>
			</div>
		);
	});

	return (
		<>
			{
				isAssistance && (
					<div className="die-container die-container--remove-dice">
						<FontAwesomeIcon
							className="infinity-field-icon-times"
							icon={faTimes}
							onClick={() => handleOnClick('0')}
						/>
					</div>
				)
			}
			{ diceRow }
		</>
	);
}

export default InfinityDiceRow;
