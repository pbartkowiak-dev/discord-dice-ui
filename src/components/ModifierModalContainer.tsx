import React from 'react';
import { connect } from 'react-redux';
import { closeModifierModal } from '../actions';
import ModifierModal from './ModifierModal';

const mapStateToProps = (state:any) => {
	return {
		showModifierModal: state.showModifierModal,
		selectedDice: state.selectedDice,
		userSettings: state.userSettings,
		rollOptionsForm: state.form.rollOptionsForm
	};
};

const mapDispatchToProps = {
	closeModifierModal
};


function ModifierModalContainer({
	userSettings,
	rollOptionsForm,
	showModifierModal,
	closeModifierModal,
	selectedDice
}:any) {
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
			/>
		</>
	);

}

export default connect(mapStateToProps, mapDispatchToProps)(ModifierModalContainer);
