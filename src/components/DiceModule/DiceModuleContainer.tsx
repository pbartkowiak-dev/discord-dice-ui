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
}: any ) {
	const rollOptions = diceModuleForm?.values || {};
	return (
		<DiceModule
			rollOptions={rollOptions}
			submitRoll={submitRoll}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);
