import React from 'react';
import { connect } from 'react-redux';
import { showMsg, openModifierModal, openCoCModal, selectDice } from '../../actions';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings,
		rollOptionsForm: state.form.rollOptionsForm
	};
}

const mapDispatchToProps = { showMsg, openCoCModal, openModifierModal, selectDice };

function DiceModuleContainer({
	userSettings,
	rollOptionsForm,
	showMsg,
	openCoCModal,
	openModifierModal,
	selectDice
}:any ) {
	let rollOptions = {};
	if (rollOptionsForm && rollOptionsForm.values) {
		rollOptions = rollOptionsForm.values;
	}
	return (
		<>
			<DiceModule
				userSettings={userSettings}
				rollOptions={rollOptions}
				showMsg={showMsg}
				openModifierModal={openModifierModal}
				openCoCModal={openCoCModal}
				selectDice={selectDice}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);