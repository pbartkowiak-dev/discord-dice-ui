import React from 'react';
import { connect } from 'react-redux';
import { showMsg, openModifierModal, selectDice } from '../../actions';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings,
		rollOptionsForm: state.form.rollOptionsForm
	};
}

const mapDispatchToProps = { showMsg, openModifierModal, selectDice };

function DiceModuleContainer({
	userSettings,
	rollOptionsForm,
	showMsg,
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
				selectDice={selectDice}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);