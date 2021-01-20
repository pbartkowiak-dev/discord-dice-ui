import React from 'react';
import { connect } from 'react-redux';
import getDiceSet from '../../utils/getDiceSet';
import { POOL, NARRATIVE_DICE, L5R_DICE, ROLL_AND_KEEP_DICE } from '../../consts/diceConstants';
import PoolBuilder from './PoolBuilder';
import { submitRoll } from '../../actions/roll.actions';

function mapStateToProps(state:any) {
	return {
		diceModuleForm: state.form.diceModuleForm
	};
}

const mapDispatchToProps = { submitRoll };

function PoolBuilderContainer({
	handleSubmit,
	diceModuleForm,
	formName,
	maxDicePool,
	submitRoll
}: any) {
	const rollOptions = diceModuleForm?.values || {};
	let isDiceImgLarge = false;

	let diceSetType;
	if (rollOptions?.narrativeDice) {
		diceSetType = NARRATIVE_DICE;
	} else if (rollOptions?.l5rMode) {
		diceSetType = L5R_DICE;
		isDiceImgLarge = true;
	} else if (rollOptions?.rollAndKeepMode) {
		diceSetType = ROLL_AND_KEEP_DICE;
		isDiceImgLarge = true;
	} else {
		diceSetType = POOL;
	}
	const diceSet = getDiceSet(diceSetType);

	return (
		<PoolBuilder
			handleSubmit={handleSubmit}
			diceSet={diceSet}
			formName={formName}
			isDiceImgLarge={isDiceImgLarge}
			maxDicePool={maxDicePool}
			submitRoll={submitRoll}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolBuilderContainer);
