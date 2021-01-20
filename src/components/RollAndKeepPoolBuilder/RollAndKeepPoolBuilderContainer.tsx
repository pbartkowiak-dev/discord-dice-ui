import React from 'react';
import { connect } from 'react-redux';
import { submitRoll } from '../../actions/roll.actions';
import RollAndKeepPoolBuilder from './RollAndKeepPoolBuilder';

const mapDispatchToProps = { submitRoll };

function RollAndKeepPoolBuilderContainer({
	diceModuleForm,
	submitRoll
}: any ) {
	const rollOptions = diceModuleForm?.values || {};
	return (
		<RollAndKeepPoolBuilder
			rollOptions={rollOptions}
			submitRoll={submitRoll}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(RollAndKeepPoolBuilderContainer);
