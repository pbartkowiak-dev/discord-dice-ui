import React from 'react';
import { connect } from 'react-redux';
import getDiceSet from '../../utils/getDiceSet';
import { POOL, NARRATIVE_DICE } from '../../consts/diceConstants';
import PoolBuilder from './PoolBuilder';

function mapStateToProps(state:any) {
	return {
		diceModuleForm: state.form.diceModuleForm
	};
}

function PoolBuilderContainer({
	handleSubmit,
	diceModuleForm,
	formName
}: any) {
	const rollOptions = diceModuleForm?.values || {};

	let diceSetType;
	if( rollOptions?.narrativeDice) {
		diceSetType = NARRATIVE_DICE;
	} else {
		diceSetType = POOL;
	}
	const diceSet = getDiceSet(diceSetType);

	return (
		<PoolBuilder
			handleSubmit={handleSubmit}
			diceSet={diceSet}
			formName={formName}
		/>
	);
}

export default connect(mapStateToProps)(PoolBuilderContainer);
