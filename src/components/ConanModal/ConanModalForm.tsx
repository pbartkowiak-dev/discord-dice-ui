// @ts-nocheck
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faDiceD20, faTimes } from '@fortawesome/free-solid-svg-icons';
import DifficultyLadder from '../difficultyLadder/DifficultyLadder';
import './ConanModalForm.css';

// @ts-ignore
const createRenderer = render => ({ input, label, id, textMuted, meta, disabled }, ...rest) => {
	return (
		<>
			{render(input, label, id, textMuted, meta, disabled, rest)}
		</>
	)
};

const tnInfo = <span>The skill’s <strong>Target Number</strong> (TN) is equal to the attribute for that skill, plus any ranks in Expertise the character possesses for that skill.</span>;
const focusInfo = <span>Each d20 result equal to or less than the character’s <strong>Focus</strong> for that skill scores two successes instead of one.</span>;
const untrainedTestInfo = <span>If the character has no ranks in Expertise or Focus makes an <strong>untrained test</strong>.</span>;
const fortuneInfo = <span>Adds "pre-rolled" bonus d20 with a score of 1 to a test.</span>;
const assistanceInfo = <span>This will be used mostly by DM when using <strong>Groups</strong>. Adds additional d20s to the roll.</span>;

function TnTooltip() {
	const key = 'TnTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="top"
			delay={100}
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					{ tnInfo }
				</Tooltip>
			}
		><FontAwesomeIcon className="conan-field-icon" icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

function FocusTooltip() {
	const key = 'FocusTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="top"
			delay={100}
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					{ focusInfo }
				</Tooltip>
			}
		><FontAwesomeIcon className="conan-field-icon" icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

function UntrainedTestTooltip() {
	const key = 'UntrainedTestTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="top"
			delay={100}
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					{ untrainedTestInfo }
				</Tooltip>
			}
		><FontAwesomeIcon className="conan-field-icon" icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

function FortuneTooltip() {
	const key = 'FortuneTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="top"
			delay={100}
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					{ fortuneInfo }
				</Tooltip>
			}
		><FontAwesomeIcon className="conan-field-icon" icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

function AssistanceTooltip() {
	const key = 'AssistanceTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="top"
			delay={100}
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					{ assistanceInfo }
				</Tooltip>
			}
		><FontAwesomeIcon className="conan-field-icon" icon={faQuestionCircle} />
		</OverlayTrigger>
		</>
	);
}

// @ts-ignore
const renderInput = createRenderer((input, label, id, textMuted, meta, disabled) => {
	const { submitFailed, touched, error } = meta;
	const hasError = !!((submitFailed || touched) && error);
	return (
		<Form.Group controlId={id}>
			<Form.Label>{label}</Form.Label>
				<Form.Control
					type="text"
					size="lg"
					placeholder="00"
					autocomplete="off"
					isInvalid ={hasError}
					{...input}
				/>
			{ hasError && <Form.Control.Feedback type="invalid">{ error }</Form.Control.Feedback> }
			{ textMuted && <Form.Text className="text-muted">{ textMuted }</Form.Text> }
		</Form.Group>
	);
});

// @ts-ignore
const RenderCheckbox = createRenderer((input, label, id, textMuted, meta, disabled) => {
	return (
		<Form.Check
			type="checkbox"
			checked={input.value ? true : false}
			label={label}
			disabled={disabled}
			id={id}
			custom {...input} />
	);
});

function DiceRow({ dice, isAssistance = false, handleDiceChange, setHover, hover, fortune }:any ) {
	const diceRowClass = classNames({
		'dice-row': true,
		'assistance-dice-row': isAssistance
	});
	return (
		<div className={diceRowClass}>
			{
				isAssistance && (
					<div className="die-container">
						<FontAwesomeIcon
							className="conan-field-icon conan-field-icon-times pointer"
							icon={faTimes}
							onClick={() => handleDiceChange('0', true)}
						/>
					</div>
				)
			}
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: !isAssistance || (isAssistance && Number(dice) >= 1),
					hovered: hover >= 1
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(1)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDiceChange('1', isAssistance)}
				/>
			</div>
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: ((Number(dice) >= 2) || Number(fortune) >= 1),
					hovered: hover >= 2
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(2)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDiceChange('2', isAssistance)}
				/>
			</div>
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: ((Number(dice) >= 3) || Number(fortune) >= 1),
					hovered: hover >= 3
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(3)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDiceChange('3', isAssistance)}
				/>
				<span className={classNames({
					'die-fortune-point': true,
					show: Number(fortune) >= 1
					})}>1</span>
			</div>
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: ((Number(dice) >= 4) || Number(fortune) >= 2),
					hovered: hover >= 4
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(4)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDiceChange('4', isAssistance)}
				/>
				<span className={classNames({
					'die-fortune-point': true,
					show: Number(fortune) >= 2
					})}>1</span>
			</div>
			{
				// Because maximum group size is 5 - one leader and 4 assisting creatures
				!isAssistance && (
					<div className="die-container">
						<FontAwesomeIcon className={classNames({
							'dice-icon': true,
							active: ((Number(dice) >= 5) || Number(fortune) >= 3),
							hovered: hover >= 5
							})}
							icon={faDiceD20}
							onMouseEnter={() => setHover(5)}
							onMouseLeave={() => setHover(0)}
							onClick={() => handleDiceChange('5', isAssistance)}
						/>
						<span className={classNames({
							'die-fortune-point': true,
							show: Number(fortune) >= 3
							})}>1</span>
					</div>
				)
			}
		</div>
	);
}


function ConanModalForm({
	change,
	invalid,
	anyTouched,
	submitFailed,
	handleSubmit,
	formValues
}: any) {
	const { focus, dice, fortune, assistanceDice, difficulty } = formValues;
	const [hover, setHover] = useState(0);
	const [assistanceHover, setAssistanceHover] = useState(0);
	const diceMax = 5;

	const handleDiceChange = (dieAmount:string, isAssistance:boolean) => {
		if (isAssistance) {
			change('assistanceDice', dieAmount);
		} else {
			change('dice', dieAmount);
			if (fortune === '3') {
				if (dieAmount === '4') {
					change('fortune', '2');
				} else if (dieAmount === '3') {
					change('fortune', '1');
				} else if (dieAmount === '2' || dieAmount === '1') {
					change('fortune', '0');
				}
			} else if (fortune === '2') {
				if (dieAmount === '3') {
					change('fortune', '1');
				} else if (dieAmount === '2' || dieAmount === '1') {
					change('fortune', '0');
				}
			} else if (fortune === '1') {
				if (dieAmount === '2' || dieAmount === '1') {
					change('fortune', '0');
				}
			}
		}
	};

	const handleFocusChange = (focusValue:string) => {
		if (focusValue) {
			const focusNum = Number(focusValue);
			if (focusNum > 0) {
				change('untrainedTest', false);
			}
		}
	};

	const diceRadios = new Array(diceMax).fill('x').map((_, index) => {
		const diceAmount = index + 1;
		return (
			<label>
			<Field
				name="dice"
				component="input"
				type="radio"
				value={`${diceAmount}`}
				onClick={() => handleDiceChange(`${diceAmount}`)}
			/>
				{diceAmount}d20
			</label>
		);
	});

	return (
		<Form
			className={ (invalid && (submitFailed || anyTouched)) ? 'form-invalid' : '' }
			id="conan-mode-form"
			onSubmit={handleSubmit}>
				<div className="skill-level-field conan-skill-level-field">
					<div className="conan-field">
						<Field
							id="focus"
							name="focus"
							label={<span>Foc <FocusTooltip /></span>}
							onChange={(evt => handleFocusChange(evt.currentTarget.value) )}
							component={renderInput}
						/>
						
					</div>
					<div className="conan-field">
						<Field
							id="tn"
							name="tn"
							label={<span>TN <TnTooltip /></span>}
							component={renderInput}
						/>
					
					</div>
				</div>
				vs.
				<div className="skill-level-field conan-skill-level-field">
					<Field
						id="difficulty"
						name="difficulty"
						component={DifficultyLadder}
					/>
				</div>
				<div className="dice">
					<h5 className="dice-title">How many dice?</h5>
					<div className="conan-radio-fields">
						{diceRadios}
					</div>
				</div>
				<DiceRow
					dice={dice}
					handleDiceChange={handleDiceChange}
					setHover={setHover}
					hover={hover}
					fortune={fortune}
				/>
				<Field
					name="untrainedTest"
					id="untrainedTest"
					label={<span>Untrained Test <UntrainedTestTooltip /></span>}
					component={RenderCheckbox}
					disabled={ focus && Number(focus) > 0 }
				/>
				<div className="fortune">
					<h5 className="fortune-title">Use Fortune Die <FortuneTooltip/></h5>
					<div className="conan-radio-fields">
						<label>
							<Field
								name="fortune"
								component="input"
								type="radio"
								value="0"
							/>
							None
						</label>
						<label>
							<Field
								name="fortune"
								component="input"
								type="radio"
								value="1"
								onChange={ () => Number(dice) < 3 ? change('dice', '3') : null}
							/>
							One
						</label>
						<label>
							<Field
								name="fortune"
								component="input"
								type="radio"
								value="2"
								onChange={ () => Number(dice) < 4 ? change('dice', '4') : null }
							/>
							Two
						</label>
						<label>
							<Field
								name="fortune"
								component="input"
								type="radio"
								value="3"
								onChange={ () => Number(dice) < 5 ? change('dice', '5') : null }
							/>
							Three
						</label>
					</div>
				</div>
				<div className="assistance">
					<h5 className="assistance-title">Add assistance <AssistanceTooltip/></h5>
					<div className="conan-radio-fields">
						<DiceRow
							isAssistance={true}
							dice={assistanceDice}
							handleDiceChange={handleDiceChange}
							hover={assistanceHover}
							setHover={setAssistanceHover}
						/>
					</div>
				</div>
		</Form>
	);
}

type errorsProps = {
	tn?: string
}

const validate = (values:any) => {
	const errors:errorsProps = {}
	const { tn } = values;
	const tnNumber = parseInt(tn, 10);

	if (!tn || !tn.trim()) {
		errors.tn = 'Target Number cannot be empty';
		return errors;
	}
	if (tnNumber < 0) {
		errors.tn = 'Target Number must be equal or greater than 0';
		return errors;
	}
	if (tnNumber > 20) {
		errors.tn = 'Target Number must be less than 20';
		return errors;
	}
	if (isNaN(tnNumber)) {
		errors.tn = 'Target Number must be a valid number';
		return errors;
	}
	return errors;
}

const form = 'ConanModalForm';

const FormElement = reduxForm({
	form,
	validate,
})(ConanModalForm);


const selector = formValueSelector(form);

export default connect(state => ({
	formValues: selector(state, 'difficulty', 'untrainedTest', 'focus', 'tn', 'dice', 'fortune', 'assistanceDice')
}))(FormElement);