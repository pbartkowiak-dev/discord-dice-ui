// @ts-nocheck
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import tooltip from '../../locale/tooltip';
import './WarhammerModalForm.css';
import localStorageWarhammerSlModeManager from "../../utils/localStorageWarhammerSlModeManager";
import { saveSlType } from "../../actions/warhammer.actions";
import InputRange from "../InputRange/InputRange";

const percentIcon = <span className="percent-icon"><FontAwesomeIcon icon={faPercent} /></span>;

// @ts-ignore
const createRenderer = render => ({ input, label, id, inputValue, textMuted, meta, disabled }, ...rest) => {
	return (
		<>
			{render(input, label, id, inputValue, textMuted, meta, disabled, rest)}
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
				{ percentIcon }
			</div>
			{ hasError && <Form.Control.Feedback type="invalid">{ error }</Form.Control.Feedback> }
			{ textMuted && <Form.Text className="text-muted">{ textMuted }</Form.Text> }
		</Form.Group>
	);
});

const warhammer4eSLLabel = (
	<span
		>Use default Warhammer 4e SL <InfoTooltip
			content={tooltip.warhammer4eSL}
			className="tooltip-fast-sl-icon"
			placement="bottom"
		/>
	</span>
);

const fastSLLabel = (
	<span
		>Use Warhammer 4e Fast SL <InfoTooltip
			content={tooltip.fastSL}
			className="tooltip-fast-sl-icon"
			placement="bottom"
		/>
	</span>
);

const warhammer2eSLLabel = (
	<span
		>Use Warhammer 2e DoS <InfoTooltip
			content={tooltip.warhammer2eSL}
			className="tooltip-fast-sl-icon"
			placement="bottom"
		/>
	</span>
);

const darkHeresyLabel = (
	<span
		>Use Dark Heresy II DoS <InfoTooltip
			content={tooltip.darkHeresy}
			className="tooltip-fast-sl-icon"
			placement="bottom"
		/>
	</span>
);

function WarhammerModalForm({
	change,
	invalid,
	anyTouched,
	submitFailed,
	handleSubmit
}: any) {
	const dispatch = useDispatch();

	const handleSlChange = (_, slType) => {
		dispatch(saveSlType(slType));
		localStorageWarhammerSlModeManager.save(slType);
	};

	const rangeId = 'warhammer-skill-range';

	const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => change('skillLevel', event.target.value);

	const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const skillRange = document.getElementById(rangeId) as HTMLInputElement;
		if (skillRange) {
			skillRange.value = event.target.value;
		}
	};

	return (
		<Form
			className={ (invalid && (submitFailed || anyTouched)) ? 'form-invalid' : '' }
			id="warhammer-mode-form"
			onSubmit={handleSubmit}>
				<div className="specialSLContainer">
					<label>
						<Field
							name="slType"
							value="warhammer4eSL"
							component="input"
							type="radio"
							onChange={handleSlChange}
						/>
						{warhammer4eSLLabel}
					</label>
					<label>
						<Field
							name="slType"
							value="fastSL"
							component="input"
							type="radio"
							onChange={handleSlChange}
						/>
						{fastSLLabel}
					</label>
					<label>
						<Field
							name="slType"
							value="warhammer2eSL"
							component="input"
							type="radio"
							onChange={handleSlChange}
						/>
						{warhammer2eSLLabel}
					</label>
					<label>
						<Field
							name="slType"
							value="darkHeresySL"
							component="input"
							type="radio"
							onChange={handleSlChange}
						/>
						{darkHeresyLabel}
					</label>
				</div>
				<div className="skill-level-field skill-level-field--with-range">
					<Field
						id="skillLevel"
						name="skillLevel"
						label="Skill level:"
						textMuted="Enter your Character's skill level"
						component={renderInput}
						onChange={handleSkillChange}
					/>
					<InputRange id={rangeId} onChange={handleRangeChange} />
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

const form = 'WarhammerModalForm';

const FormElement = reduxForm({
	form,
	validate,
})(WarhammerModalForm);


const selector = formValueSelector(form);

export default connect(state => ({
	formValues: selector(state, 'fastSL', 'darkHeresySL', 'warhammer4eSL', 'warhammer2eSL', 'slType')
}))(FormElement);
