import React from 'react';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import './DiceModuleForm.css';

function InfoTooltip() {
	const placement = 'bottom';
	return (
		<>
		<OverlayTrigger
			key={placement}
			placement={placement}
			overlay={
				<Tooltip id={`tooltip-${placement}`}>
					<span>Works only with <strong>d100</strong>.</span><br/>
					<span>Will roll multiple dice with common units value.</span>
				</Tooltip>
			}
		><FontAwesomeIcon icon={faQuestionCircle} className="icon-info" />
		</OverlayTrigger>
		</>
	);
}

const bonusDieLabel = (
	<span>CoC 7e Bonus Die <InfoTooltip/></span>
);

const penaltyDieLabel = <span>CoC 7e Penalty Die <InfoTooltip/></span>

// @ts-ignore
const createRenderer = render  => ({ input, meta, label, id }, ...rest) => {
	return (
		<>
			{ render(input, label, id, rest )}
		</>
	);
};

// @ts-ignore
const RenderCheckbox = createRenderer((input, label, id) =>
	<Form.Check type="checkbox" label={label} id={id} custom {...input} />
);

function DiceModuleForm(props:any) {
	const { handleSubmit, pristine, reset, submitting } = props
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
				name="cocBonus"
				id="cocBonus"
				label={bonusDieLabel}
				component={RenderCheckbox}
			/>
			<Field
				name="cocPenalty"
				id="cocPenalty"
				label={penaltyDieLabel}
				component={RenderCheckbox}
			/>
		</Form>
	);
}


export default reduxForm({
	form: 'rollOptionsForm'
})(DiceModuleForm);