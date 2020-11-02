import React from 'react';
import { connect } from 'react-redux';
import { submitRoll } from '../../actions/roll.actions';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		diceModuleForm: state.form.diceModuleForm
	};
}

const mapDispatchToProps = { submitRoll };

function DiceModuleContainer({
	diceModuleForm,
	submitRoll
}:any ) {
	// @TODO rollOPTIONS separate from form values preferences
	// @TODO set default values
	let rollOptions = {};
	if (diceModuleForm && diceModuleForm.values) {
		rollOptions = diceModuleForm.values;
	}

	return (
		<DiceModule
			rollOptions={rollOptions}
			submitRoll={submitRoll}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);
