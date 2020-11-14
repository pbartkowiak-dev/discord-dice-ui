import React from 'react';
import { connect } from 'react-redux';
import App from './App';

function mapStateToProps(state:any) {
	return {
		diceModuleForm: state.form.diceModuleForm
	};
}

function AppContainer({ diceModuleForm }: any) {
	const rollOptions = diceModuleForm?.values || {};
	return <App rollOptions={rollOptions} />
}

export default connect(mapStateToProps)(AppContainer);
