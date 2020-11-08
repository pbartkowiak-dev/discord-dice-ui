import React from 'react';
import { connect } from 'react-redux';
import PoolBuilder from './PoolBuilder'

function mapStateToProps(state:any) {
	return {
		diceModuleForm: state.form.diceModuleForm
	};
}

function PoolBuilderContainer({
	handleSubmit,
	diceModuleForm
}: any) {
	const rollOptions = diceModuleForm?.values || {};
	return (
		<PoolBuilder
			rollOptions={rollOptions}
			handleSubmit={handleSubmit}
		/>
	);
}

export default connect(mapStateToProps)(PoolBuilderContainer);
