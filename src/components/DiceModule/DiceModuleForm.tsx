import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import './DiceModuleForm.css';

function CoCModTooltip() {
	const key = 'CoCModTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="bottom"
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					<span>Will open modal with additional options on the <strong>d100</strong> roll.</span>
				</Tooltip>
			}
		><FontAwesomeIcon icon={faQuestionCircle} className="icon-info" />
		</OverlayTrigger>
		</>
	);
}

function WarhammerTooltip() {
	const key = 'WarhammerTooltip';
	return (
		<>
		<OverlayTrigger
			key={key}
			placement="bottom"
			overlay={
				<Tooltip id={`tooltip-${key}`}>
					<span>Supports rolling <strong>SL</strong> for Warhammer 4e and <strong>DoS</strong> for Dark Heresy II.</span>
				</Tooltip>
			}
		><FontAwesomeIcon icon={faQuestionCircle} className="icon-info" />
		</OverlayTrigger>
		</>
	);
}

const cocModeLabel = (
	<span>Call of Cthulhu 7e Mode <CoCModTooltip/></span>
);

const warhammerModeLabel = (
	<span>Warhammer Mode <WarhammerTooltip/></span>
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
	const { warhammerMode, cocMode } = rollOptions;
	return (
		<Form id ="roll-options-form" className="dice-module dice-form">
			<Field
				name="keepHighest"
				id="keepHighest"
				label="Keep highest"
				component={RenderCheckbox}
			/>
			<Field
				name="keepLowest"
				id="keepLowest"
				label="Keep lowest"
				component={RenderCheckbox}
			/>
			<Field
				name="sumResults"
				id="sumResults"
				label="Sum results"
				component={RenderCheckbox}
			/>
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
				disabled={warhammerMode}
			/>
			<Field
				name="warhammerMode"
				id="warhammerMode"
				label={warhammerModeLabel}
				component={RenderCheckbox}
				disabled={cocMode}
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
	rollOptions: selector(state, 'cocMode', 'warhammerMode')
}))(FormElement);