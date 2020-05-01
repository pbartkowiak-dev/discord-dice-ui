import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import './CoCModalForm.css';

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

const bonusDieLabel = <span>Apply <strong>one</strong> Bonus Die</span>;
const bonusTwoDiceLabel = <span>Apply <strong>two</strong> Bonus Die</span>;
const penaltyDieLabel = <span>Apply <strong>one</strong> Penalty Die</span>;
const penaltyTwoDiceLabel = <span>Apply <strong>two</strong> Penalty Die</span>;


function CoCModalForm({
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
			id="coc-mode-form"
			onSubmit={handleSubmit}>
				<div className="skill-level-field">
					<Field
						id="skillLevel"
						name="skillLevel"
						label="Skill level:"
						textMuted="Enter your Investigator's skill level"
						component={renderInput}
					/>
				</div>
				<Form.Row>
					<Form.Group as={Col} md="6">
						<Field
							name="cocBonus"
							id="cocBonus"
							label={bonusDieLabel}
							component={RenderCheckbox}
							disabled={ cocPenalty || cocTwoPenalty || cocTwoBonus }
						/>
						<Field
							name="cocTwoBonus"
							id="cocTwoBonus"
							label={bonusTwoDiceLabel}
							component={RenderCheckbox}
							disabled={ cocPenalty || cocTwoPenalty || cocBonus }
						/>
					</Form.Group>
					<Form.Group as={Col} md="6">
					<Field
						name="cocPenalty"
						id="cocPenalty"
						label={penaltyDieLabel}
						component={RenderCheckbox}
						disabled={ cocBonus || cocTwoPenalty || cocTwoBonus }
					/>
					<Field
						name="cocTwoPenalty"
						id="cocTwoPenalty"
						label={penaltyTwoDiceLabel}
						component={RenderCheckbox}
						disabled={ cocBonus || cocPenalty || cocTwoBonus }
					/>
				</Form.Group>
			</Form.Row>
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
})(CoCModalForm);


const selector = formValueSelector(form);

export default connect(state => ({
	specialDie: selector(state, 'cocBonus', 'cocPenalty', 'cocTwoBonus', 'cocTwoPenalty')
}))(FormElement);