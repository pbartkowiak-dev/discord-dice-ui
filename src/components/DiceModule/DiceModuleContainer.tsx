import React from 'react';
import { connect } from 'react-redux';
import { submitRoll } from '../../actions/roll.actions';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {};
}

const mapDispatchToProps = { submitRoll };

function DiceModuleContainer({
	diceModuleForm,
	submitRoll
}:any ) {
	// @TODO rollOPTIONS separater from form values preferences
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
