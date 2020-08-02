import React from 'react';
import { connect } from 'react-redux';
import { closeModifierModal, showMsgModal } from '../../actions/modals';
import ModifierModal from './ModifierModal';

const mapStateToProps = (state:any) => {
	return {
		showModifierModal: state.showModifierModal,
		selectedDice: state.selectedDice,
		userSettings: state.userSettings,
		diceModuleForm: state.form.diceModuleForm
	};
};

const mapDispatchToProps = { closeModifierModal, showMsgModal };

type ModifierModalContainerProps = {
	userSettings: any,
	diceModuleForm: any,
	closeModifierModal: Function,
	showMsgModal: Function,
	selectedDice: any
	showModal: boolean
}

function ModifierModalContainer({
	userSettings,
	diceModuleForm,
	closeModifierModal,
	selectedDice,
	showModal,
	showMsgModal
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
				closeModifierModal={closeModifierModal}
				selectedDice={selectedDice}
				showMsgModal={showMsgModal}
				showModal={showModal}
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(ModifierModalContainer);
