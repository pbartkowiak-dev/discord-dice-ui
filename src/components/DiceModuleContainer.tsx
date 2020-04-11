import React from 'react';
import { connect } from 'react-redux';
import { showMsg } from '../actions';

import DiceModule from './DiceModule';

function mapStateToProps(state:any) {
	return {
		userSettings: state.userSettings,
		rollOptionsForm: state.form.rollOptionsForm
	};
}

const mapDispatchToProps = { showMsg };

function DiceModuleContainer({ userSettings, rollOptionsForm, showMsg }:any ) {
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
				/>
			</>
		);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceModuleContainer);