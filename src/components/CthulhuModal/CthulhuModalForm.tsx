import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from "react-bootstrap";
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent, faTimes } from '@fortawesome/free-solid-svg-icons';
import './CthulhuModalForm.css';
import InputRange from "../InputRange/InputRange";
import cthulhuSkillsList, { getSkillById, SkillType } from "../CthulhuSheetModal/utils/cthulhuSkillsList";
import cthulhuAttributesList, {
	AttributeType,
	getAttributeById
} from "../CthulhuSheetModal/utils/cthulhuAttributesList";
import styles from "../CthulhuSheetModal/CthulhuSheetModal.module.css";
import Modal from "react-bootstrap/Modal";

const PercentIcon = () => (
	<span className="percent-icon"><FontAwesomeIcon icon={faPercent} /></span>
);

const TimesIcon = ({ onClick }: { onClick: (e: any) => void }) => (
	<span className="cthulhu-select-to-sheet__times-icon" onClick={onClick}><FontAwesomeIcon icon={faTimes} /></span>
);

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
					autoComplete="off"
					isInvalid ={hasError}
					{...input}
				/>
				<PercentIcon />
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
const bonusTwoDiceLabel = <span>Apply <strong>two</strong> Bonus Dice</span>;
const penaltyDieLabel = <span>Apply <strong>one</strong> Penalty Die</span>;
const penaltyTwoDiceLabel = <span>Apply <strong>two</strong> Penalty Dice</span>;

function CthulhuModalForm({
	formId,
	change,
	invalid,
	anyTouched,
	submitFailed,
	handleSubmit,
	specialDie,
	skillId = ''
}: any) {
	const { cthulhuBonus, cthulhuTwoBonus, cthulhuPenalty, cthulhuTwoPenalty } = specialDie;
	const rangeId = 'cthulhu-skill-range';

	const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => change('skillLevel', event.target.value);

	const handleSkillValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const skillRange = document.getElementById(rangeId) as HTMLInputElement;
		if (skillRange) {
			skillRange.value = event.target.value;
		}
	};

	const handleDropdownChange = (event: any, id: string) => {
		event.preventDefault();
		change('skillId', id)
	};

	const clearSkill = (event: any) => {
		event.preventDefault();
		change('skillId', '')
	};

	const selectedSkill = getSkillById(skillId) || getAttributeById(skillId) || null;

	return (
		<Form
			className={ (invalid && (submitFailed || anyTouched)) ? 'form-invalid' : '' }
			id={formId}
			onSubmit={handleSubmit}>
				<div className="skill-level-field skill-level-field--with-range">
					<Field
						id="skillLevel"
						name="skillLevel"
						label="Skill level:"
						textMuted="Enter your Investigator's skill level"
						component={renderInput}
						onChange={handleSkillValueChange}
					/>
					<InputRange id={rangeId} onChange={handleRangeChange} />
				</div>
				<Form.Row className="cthulhu-checkboxes-row">
					<Form.Group as={Col} md="6">
						<Field
							name="cthulhuBonus"
							id="cthulhuBonus"
							label={bonusDieLabel}
							component={RenderCheckbox}
							disabled={ cthulhuPenalty || cthulhuTwoPenalty || cthulhuTwoBonus }
						/>
						<Field
							name="cthulhuTwoBonus"
							id="cthulhuTwoBonus"
							label={bonusTwoDiceLabel}
							component={RenderCheckbox}
							disabled={ cthulhuPenalty || cthulhuTwoPenalty || cthulhuBonus }
						/>
					</Form.Group>
					<Form.Group as={Col} md="6">
					<Field
						name="cthulhuPenalty"
						id="cthulhuPenalty"
						label={penaltyDieLabel}
						component={RenderCheckbox}
						disabled={ cthulhuBonus || cthulhuTwoPenalty || cthulhuTwoBonus }
					/>
					<Field
						name="cthulhuTwoPenalty"
						id="cthulhuTwoPenalty"
						label={penaltyTwoDiceLabel}
						component={RenderCheckbox}
						disabled={ cthulhuBonus || cthulhuPenalty || cthulhuTwoBonus }
					/>
				</Form.Group>
			</Form.Row>
			<section className="cthulhu-select-to-sheet__container">
				<input type="hidden" name="skillId" id="skillId" value={skillId} />
				<Dropdown className="cthulhu-select-to-sheet__dropdown">
					<Dropdown.Toggle
						variant="outline-secondary"
						id="cthulhu-select-to-sheet-dropdown"
						className="cthulhu-select-to-sheet__button"
					>
						<span>{selectedSkill?.name || "Save a Skill to the Character Sheet"}</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<div className="cthulhu-select-to-sheet__list"> {
							cthulhuAttributesList.map(({ id, name }: AttributeType) => (
								<Dropdown.Item
									key={id}
									href="#"
									className={classNames({
										'cthulhu-select-to-sheet__item--selected': skillId && skillId === id
									})}
									onClick={(e) => handleDropdownChange(e, id)}>{name}</Dropdown.Item>
							))
						} </div>
						<div className="cthulhu-select-to-sheet__list-separator" />
						<div className="cthulhu-select-to-sheet__list"> {
							cthulhuSkillsList.map(({ id, name }: SkillType) => (
								<Dropdown.Item
									key={id}
									href="#"
									className={classNames({
										'cthulhu-select-to-sheet__item--selected': skillId && skillId === id
									})}
									onClick={(e) => handleDropdownChange(e, id)}>{name}</Dropdown.Item>
							))
						} </div>
					</Dropdown.Menu>
				</Dropdown>
				<TimesIcon onClick={clearSkill}/>
			</section>
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

const form = 'cthulhuForm';

const FormElement = reduxForm({
	form,
	validate
})(CthulhuModalForm);


const selector = formValueSelector(form);

export default connect(state => ({
	skillId: selector(state, 'skillId'),
	specialDie: selector(
		state,
		'cthulhuBonus',
		'cthulhuPenalty',
		'cthulhuTwoBonus',
		'cthulhuTwoPenalty'
	)
}))(FormElement);