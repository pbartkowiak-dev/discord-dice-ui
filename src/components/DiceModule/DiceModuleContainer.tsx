import React from 'react';
import { connect } from 'react-redux';
import { showMsg, openModifierModal, openCoCModal, openWarhammer4eModal, selectDice } from '../../actions';
import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings,
		rollOptionsForm: state.form.rollOptionsForm
	};
}

const mapDispatchToProps = { showMsg, openCoCModal, openWarhammer4eModal, openModifierModal, selectDice };

function DiceModuleContainer({
	userSettings,
	rollOptionsForm,
	showMsg,
	openCoCModal,
	openWarhammer4eModal,
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
				openWarhammer4eModal={openWarhammer4eModal}
				selectDice={selectDice}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);