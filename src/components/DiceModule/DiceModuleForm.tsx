import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import tooltip from '../../locale/tooltip';
import './DiceModuleForm.css';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

const cocModeLabel = (
	<span>Call of Cthulhu 7e Mode <InfoTooltip content={tooltip.coCModTooltip} /></span>
);

const warhammerModeLabel = (
	<span>Warhammer Mode <InfoTooltip content={tooltip.warhammerTooltip} /></span>
);

const conanModeLabel = (
	<span>Conan 2d20 Mode <InfoTooltip content={tooltip.conanTooltip} /></span>
);

// @ts-ignore
const createRenderer = render  => ({ input, meta, label, id, disabled }, ...rest) => {
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
	const { warhammerMode, cocMode, conanMode } = rollOptions;
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
				disabled={warhammerMode || conanMode}
			/>
			<Field
				name="warhammerMode"
				id="warhammerMode"
				label={warhammerModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || conanMode}
			/>
			<Field
				name="conanMode"
				id="conanMode"
				label={conanModeLabel}
				component={RenderCheckbox}
				disabled={cocMode || warhammerMode}
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
	rollOptions: selector(state, 'cocMode', 'warhammerMode', 'conanMode')
}))(FormElement);