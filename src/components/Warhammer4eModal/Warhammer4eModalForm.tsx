import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import './Warhammer4eModalForm.css';

const percentIcon = <span className="percent-icon"><FontAwesomeIcon icon={faPercent} /></span>;

// @ts-ignore
const createRenderer = render => ({ input, label, id, textMuted, meta, disabled }, ...rest) => {
	return (
		<>
			{render(input, label, id, textMuted, meta, disabled, rest)}
		</>
	)
};

// @ts-ignore
const renderInput = createRenderer((input, label, id, textMuted, meta, disabled) => {
	const { submitFailed, touched, error } = meta;
	const hasError = !!((submitFailed || touched) && error);
	return (
		<Form.Group controlId={id}>
			<Form.Label>{label}</Form.Label>
				<div className="percent-icon-container">
				<Form.Control
					type="text"
					size="lg"
					placeholder="00"
					autocomplete="off"
					isInvalid ={hasError}
					{...input}
				/>
				{ percentIcon }
			</div>
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
			label={label}
			disabled={disabled}
			id={id}
			custom {...input} />
	);
});

function FastSLTooltip() {
	const key = 'FastSLTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="bottom"
			overlay={
				<Tooltip id={`tooltip-${key}`}
					className="tooltip-fast-sl">
					<p>When you <strong className="tooltip-success">pass</strong> a Test, use the result of the tens die as your SL.</p>
					<p>If a Test <strong className="tooltip-failed">fails</strong>, you calculate SL as normal, taking your rolled tens die from your tested Skill to determine your negative SL.</p>
				</Tooltip>
			}
		><FontAwesomeIcon icon={faQuestionCircle} className="icon-info tooltip-fast-sl-icon" />
		</OverlayTrigger>
		</>
	);
}

const fastSLLabel = <span>Use Fast SL <FastSLTooltip/></span>;

function Warhammer4eModalForm({
	invalid,
	anyTouched,
	submitFailed,
	handleSubmit,
	specialDie
}: any) {
	const { cocBonus, cocTwoBonus, cocPenalty, cocTwoPenalty } = specialDie;
	return (
		<Form
			className={ (invalid && (submitFailed || anyTouched)) ? 'form-invalid' : '' }
			id="warhammer4e-mode-form"
			onSubmit={handleSubmit}>
				<Field
					name="fastSL"
					id="fastSL"
					label={fastSLLabel}
					component={RenderCheckbox}
				/>
				<div className="skill-level-field">
					<Field
						id="skillLevel"
						name="skillLevel"
						label="Skill level:"
						textMuted="Enter your Character's skill level"
						component={renderInput}
					/>
				</div>
		</Form>
	);
}

type errorsProps = {
	skillLevel?: string
}

const validate = (values:any) => {
	const errors:errorsProps = {}
	const { skillLevel } = values;
	const skillLevelNumber = parseInt(skillLevel, 10);

	if (!skillLevel || !skillLevel.trim()) {
		errors.skillLevel = 'Skill level cannot be empty';
		return errors;
	}
	if (skillLevelNumber <= 0) {
		errors.skillLevel = 'Skill level must be greater than 0';
		return errors;
	}
	if (skillLevelNumber > 200) {
		errors.skillLevel = 'Skill level must be less than 200%';
		return errors;
	}
	if (isNaN(skillLevelNumber)) {
		errors.skillLevel = 'Skill level must be a valid number';
		return errors;
	}
	return errors;
}

const form = 'cocModeForm';

const FormElement = reduxForm({
	form,
	validate
})(Warhammer4eModalForm);


const selector = formValueSelector(form);

export default connect(state => ({
	specialDie: selector(state, 'cocBonus', 'cocPenalty', 'cocTwoBonus', 'cocTwoPenalty')
}))(FormElement);