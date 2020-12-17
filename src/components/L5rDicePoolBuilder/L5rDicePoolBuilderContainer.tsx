import React from 'react';
import { connect } from 'react-redux';
import { submitRoll } from '../../actions/roll.actions';
import { l5rSendState } from '../../actions/l5r.actions';
import L5rDicePoolBuilder from './L5rDicePoolBuilder';

const mapDispatchToProps = { submitRoll, l5rSendState };

function L5rDicePoolBuilderContainer({
	diceModuleForm,
	submitRoll,
	l5rSendState
}: any ) {
	const rollOptions = diceModuleForm?.values || {};
	return (
		<L5rDicePoolBuilder
			rollOptions={rollOptions}
			submitRoll={submitRoll}
			l5rSendState={l5rSendState}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(L5rDicePoolBuilderContainer);
