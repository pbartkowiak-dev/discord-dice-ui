import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import tooltip from '../../locale/tooltip';
import './DiceModuleForm.css';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

const cocModeLabel = (
	<span>Call of Cthulhu 7e</span>
);

const warhammerModeLabel = (
	<span>Warhammer <InfoTooltip content={tooltip.warhammerTooltip} /></span>
);

const conanModeLabel = (
	<span>Conan 2d20</span>
);

const eoteModeLabel = (
	<span>Narrative Dice</span>
);

const l5rModeLabel = (
	<span>L5R 5e Dice</span>
);


// @ts-ignore
const createRenderer = render  => ({ input, label, id, disabled }, ...rest) => {
	return (
		<>
			{ render(input, label, id, disabled, rest )}
		</>
	);
};

// @ts-ignore
const RenderCheckbox = createRenderer((input, label, id, disabled) =>
	<Form.Check
		type="checkbox"
		label={label}
		id={id}
		custom
		disabled={disabled}
		{...input}
	/>
);

function DiceModuleForm({ rollOptions }:any) {
	const {
		warhammerMode,
		cocMode,
		conanMode,
		narrativeDice,
		l5rMode
	} = rollOptions;

	return (
		<Form id ="roll-options-form" className="dice-module dice-form">
			<Field
				name="useModifier"
				id="useModifier"
				label="Add modifier"
				component={RenderCheckbox}
			/>
			<Field
				name="cocMode"
				id="cocMode"
				label={cocModeLabel}
				component={RenderCheckbox}
				disabled={warhammerMode || conanMode || narrativeDice || l5rMode}
			/>
			<Field
				name="warhammerMode"
				id="warhammerMode"
				label={warhammerModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || narrativeDice || l5rMode}
			/>
			<Field
				name="conanMode"
				id="conanMode"
				label={conanModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || warhammerMode || narrativeDice || l5rMode}
			/>
			<Field
				name="narrativeDice"
				id="narrativeDice"
				label={eoteModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || warhammerMode || l5rMode}
			/>
			<Field
				name="l5rMode"
				id="l5rMode"
				label={l5rModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || warhammerMode || narrativeDice}
			/>
		</Form>
	);
}

const form = 'diceModuleForm';

const FormElement = reduxForm({
	form
})(DiceModuleForm);


const selector = formValueSelector(form);

export default connect(state => ({
	rollOptions: selector(
		state,
		'cocMode',
		'warhammerMode',
		'conanMode',
		'narrativeDice',
		'l5rMode'
	)
}))(FormElement);
