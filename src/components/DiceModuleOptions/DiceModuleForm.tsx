import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import './DiceModuleForm.css';

const cocModeLabel = <span>Call of Cthulhu 7e</span>;
const warhammerModeLabel = <span>Warhammer</span>;
const conanModeLabel = <span>Conan 2d20</span>;
const infinityModeLabel = <span>Infinity 2d20</span>;
const eoteModeLabel = <span>Narrative Dice</span>;
const l5r1eModeLabel = <span>Roll and Keep</span>;
const l5rModeLabel = <span>L5R 5e</span>;
const fateLabel = <span>Fate</span>;

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
		infinityMode,
		narrativeDice,
		rollAndKeepMode,
		l5rMode,
		fateMode
	} = rollOptions;

	// TODO CREATE ISDISABLED FN
	return (
		<Form id ="roll-options-form" className="dice-module dice-form">
			<Field
				name="useModifier"
				id="useModifier"
				label="Add modifier"
				component={RenderCheckbox}
				disabled={ narrativeDice || rollAndKeepMode }
			/>
			<Field
				name="cocMode"
				id="cocMode"
				label={cocModeLabel}
				component={RenderCheckbox}
				disabled={warhammerMode || conanMode || infinityMode || narrativeDice || l5rMode || fateMode || rollAndKeepMode }
			/>
			<Field
				name="warhammerMode"
				id="warhammerMode"
				label={warhammerModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || infinityMode || narrativeDice || l5rMode || fateMode || rollAndKeepMode }
			/>
			<Field
				name="conanMode"
				id="conanMode"
				label={conanModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || warhammerMode || infinityMode || narrativeDice || l5rMode || fateMode || rollAndKeepMode }
			/>
			<Field
				name="infinityMode"
				id="infinityMode"
				label={infinityModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || warhammerMode || conanMode || narrativeDice || l5rMode || fateMode || rollAndKeepMode }
			/>
			<Field
				name="narrativeDice"
				id="narrativeDice"
				label={eoteModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || infinityMode || warhammerMode || l5rMode || fateMode || rollAndKeepMode }
			/>
			<Field
				name="fateMode"
				id="fateMode"
				label={fateLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || infinityMode || warhammerMode || narrativeDice || l5rMode || rollAndKeepMode }
			/>
			<Field
				name="rollAndKeepMode"
				id="rollAndKeepMode"
				label={l5r1eModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || infinityMode || warhammerMode || narrativeDice || fateMode || l5rMode} 
			/>
			<Field
				name="l5rMode"
				id="l5rMode"
				label={l5rModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode || infinityMode || warhammerMode || narrativeDice || fateMode || rollAndKeepMode }
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
		'infinityMode',
		'narrativeDice',
		'rollAndKeepMode',
		'l5rMode',
		'fateMode'
	)
}))(FormElement);
