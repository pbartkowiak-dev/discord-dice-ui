import React from 'react';
import { connect } from 'react-redux';
import { showMsg, openModifierModal, openCoCModal, openWarhammerModal, openConanModal, selectDice } from '../../actions';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings,
		diceModuleForm: state.form.diceModuleForm
	};
}

const mapDispatchToProps = { showMsg, openCoCModal, openWarhammerModal, openConanModal, openModifierModal, selectDice };

function DiceModuleContainer({
	userSettings,
	diceModuleForm,
	showMsg,
	openCoCModal,
	openWarhammerModal,
	openConanModal,
	openModifierModal,
	selectDice
}:any ) {
	// @TODO rollOPTIONS separater from form values preferences
	let rollOptions = {};
	if (diceModuleForm && diceModuleForm.values) {
		rollOptions = diceModuleForm.values;
	}

	return (
		<>
			<DiceModule
				userSettings={userSettings}
				rollOptions={rollOptions}
				showMsg={showMsg}
				openModifierModal={openModifierModal}
				openCoCModal={openCoCModal}
				openWarhammerModal={openWarhammerModal}
				openConanModal={openConanModal}
				selectDice={selectDice}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);