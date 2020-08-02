import React from 'react';
import { connect } from 'react-redux';
import { selectDice } from '../../actions';
import { openModifierModal, openCoCModal, openWarhammerModal, openConanModal, showMsgModal } from '../../actions/modals';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings,
		diceModuleForm: state.form.diceModuleForm
	};
}

const mapDispatchToProps = { showMsgModal, openCoCModal, openWarhammerModal, openConanModal, openModifierModal, selectDice };

function DiceModuleContainer({
	userSettings,
	diceModuleForm,
	showMsgModal,
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
		<DiceModule
			userSettings={userSettings}
			rollOptions={rollOptions}
			showMsgModal={showMsgModal}
			openModifierModal={openModifierModal}
			openCoCModal={openCoCModal}
			openWarhammerModal={openWarhammerModal}
			openConanModal={openConanModal}
			selectDice={selectDice}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);
