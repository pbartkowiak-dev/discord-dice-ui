import React from 'react';
import { connect } from 'react-redux';
import { submitRoll } from '../../actions/roll.actions';
import EotePoolBuilder from './EotePoolBuilder';

const mapDispatchToProps = { submitRoll };

function EotePoolBuilderContainer({
	diceModuleForm,
	submitRoll
}: any ) {
	const rollOptions = diceModuleForm?.values || {};
	return (
		<EotePoolBuilder
			rollOptions={rollOptions}
			submitRoll={submitRoll}
		/>
	);
}

export default connect(undefined, mapDispatchToProps)(EotePoolBuilderContainer);
