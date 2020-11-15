import React from 'react';
import { connect } from 'react-redux';
import { submitRoll } from '../../actions/roll.actions';
import NarrativeDicePoolBuilder from './NarrativeDicePoolBuilder';

const mapDispatchToProps = { submitRoll };

function NarrativeDicePoolBuilderContainer({
	diceModuleForm,
	submitRoll
}: any ) {
	const rollOptions = diceModuleForm?.values || {};
	return (
		<NarrativeDicePoolBuilder
			rollOptions={rollOptions}
			submitRoll={submitRoll}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(NarrativeDicePoolBuilderContainer);
