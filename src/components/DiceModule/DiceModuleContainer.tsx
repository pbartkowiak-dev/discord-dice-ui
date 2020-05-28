import React from 'react';
import { connect } from 'react-redux';
import { showMsg, openModifierModal, openCoCModal, openWarhammerModal, selectDice } from '../../actions';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings,
		diceModuleForm: state.form.diceModuleForm
	};
}

const mapDispatchToProps = { showMsg, openCoCModal, openWarhammerModal, openModifierModal, selectDice };

function DiceModuleContainer({
	userSettings,
	diceModuleForm,
	showMsg,
	openCoCModal,
	openWarhammerModal,
	openModifierModal,
	selectDice
}:any ) {
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
				selectDice={selectDice}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);