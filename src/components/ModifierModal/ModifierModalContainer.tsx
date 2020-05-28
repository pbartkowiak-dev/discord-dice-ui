import React from 'react';
import { connect } from 'react-redux';
import { closeModifierModal, showMsg } from '../../actions';
import ModifierModal from './ModifierModal';

const mapStateToProps = (state:any) => {
	return {
		showModifierModal: state.showModifierModal,
		selectedDice: state.selectedDice,
		userSettings: state.userSettings,
		diceModuleForm: state.form.diceModuleForm
	};
};

const mapDispatchToProps = { closeModifierModal, showMsg };

type ModifierModalContainerProps = {
	userSettings: any,
	diceModuleForm: any,
	showModifierModal: boolean,
	closeModifierModal: Function,
	showMsg: Function,
	selectedDice: any
}

function ModifierModalContainer({
	userSettings,
	diceModuleForm,
	showModifierModal,
	closeModifierModal,
	selectedDice,
	showMsg
}:ModifierModalContainerProps) {
	let rollOptions = {};
	if (diceModuleForm && diceModuleForm.values) {
		rollOptions = diceModuleForm.values;
	}
	return (
		<>
			<ModifierModal
				userSettings={userSettings}
				rollOptions={rollOptions}
				showModifierModal={showModifierModal}
				closeModifierModal={closeModifierModal}
				selectedDice={selectedDice}
				showMsg={showMsg}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(ModifierModalContainer);
