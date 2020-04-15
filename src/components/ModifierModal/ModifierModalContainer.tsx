import React from 'react';
import { connect } from 'react-redux';
import { closeModifierModal, showMsg } from '../../actions';
import ModifierModal from './ModifierModal';

const mapStateToProps = (state:any) => {
	return {
		showModifierModal: state.showModifierModal,
		selectedDice: state.selectedDice,
		userSettings: state.userSettings,
		rollOptionsForm: state.form.rollOptionsForm
	};
};

const mapDispatchToProps = { closeModifierModal, showMsg };

type ModifierModalContainerProps = {
	userSettings: any,
	rollOptionsForm: any,
	showModifierModal: boolean,
	closeModifierModal: Function,
	showMsg: Function,
	selectedDice: any
}

function ModifierModalContainer({
	userSettings,
	rollOptionsForm,
	showModifierModal,
	closeModifierModal,
	selectedDice,
	showMsg
}:ModifierModalContainerProps) {
	let rollOptions = {};
	if (rollOptionsForm && rollOptionsForm.values) {
		rollOptions = rollOptionsForm.values;
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
