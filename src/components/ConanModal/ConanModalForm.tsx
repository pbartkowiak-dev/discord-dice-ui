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
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
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
const untrainedTestInfo = <span>If the character has no ranks in Expertise or Focus makes an <strong>untrained formValues</strong>.</span>;
const fortuneInfo = <span>Adds "pre-rolled" bonus d20 with a score of 1 to a test.</span>

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

function DiceRow({ dice, change, setHover, hover, fortune }:any ) {
	const handleDieClick = (dieAmount:string) => {
		change('dice', dieAmount);
	}
	return (
		<div className="dice-row">
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: true,
					hovered: hover >= 2
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(2)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDieClick('2')}
				/>
			</div>
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: true,
					hovered: hover >= 2
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(2)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDieClick('2')}
				/>
			</div>
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: (Number(dice) >= 3) || Number(fortune) >= 1,
					hovered: hover >= 3
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(3)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDieClick('3')}
				/>
				<span className="die-fortune-point">1</span>
			</div>
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: Number(dice) >= 4,
					hovered: hover >= 4
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(4)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDieClick('4')}
				/>
				<span className="die-fortune-point">1</span>
			</div>
			<div className="die-container">
				<FontAwesomeIcon className={classNames({
					'dice-icon': true,
					active: Number(dice) >= 5,
					hovered: hover >= 5
					})}
					icon={faDiceD20}
					onMouseEnter={() => setHover(5)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleDieClick('5')}
				/>
				<span className="die-fortune-point">1</span>
			</div>
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
	console.log('formValues', formValues)
	const { focus, dice, fortune } = formValues;
	const [hover, setHover] = useState(0);

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
				<div className="dice">
					<h5 className="dice-title">How many dice?</h5>
					<div className="conan-radio-fields">
						<label>
							<Field
								name="dice"
								component="input"
								type="radio"
								value="2"
							/>
							2d20
						</label>
						<label>
							<Field
								name="dice"
								component="input"
								type="radio"
								value="3"
							/>
							3d20
						</label>
						<label>
							<Field
								name="dice"
								component="input"
								type="radio"
								value="4"
							/>
							4d20
						</label>
						<label>
							<Field
								name="dice"
								component="input"
								type="radio"
								value="5"
							/>
							5d20
						</label>
					</div>
				</div>
				<DiceRow
					dice={dice}
					change={change}
					setHover={setHover}
					hover={hover}
					fortune={fortune}
				/>
				<Field
					name="untrainedTest"
					id="untrainedTest"
					label={<span>Untrained Test <UntrainedTestTooltip /></span>}
					component={RenderCheckbox}
					disabled={ focus }
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
							/>
							One
						</label>
						<label>
							<Field
								name="fortune"
								component="input"
								type="radio"
								value="2"
							/>
							Two
						</label>
						<label>
							<Field
								name="fortune"
								component="input"
								type="radio"
								value="3"
							/>
							Three
						</label>
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
	console.log('tn', tn)
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
	formValues: selector(state, 'untrainedTest', 'focus', 'tn', 'dice')
}))(FormElement);