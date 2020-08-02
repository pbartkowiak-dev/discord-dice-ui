import React from 'react';
import { connect } from 'react-redux';

import SettingsModalContainer from '../SettingsModal/SettingsModalContainer';
import ModifierModalContainer from '../ModifierModal/ModifierModalContainer';
import ResultsModalContainer from '../ResultsModal/ResultsModalContainer';
import CoCModalContainer from '../CoCModal/CoCModalContainer';
import WarhammerModalContainer from '../WarhammerModal/WarhammerModalContainer';
import ConanModalContainer from '../ConanModal/ConanModalContainer';

import { modalsStateTypes } from '../../reducers/modalsReducer';

type modalsPropTypes = {
	modalsState: modalsStateTypes
}

const mapStateToProps = (state:any) => {
	return { modalsState: state.modalsState };
}

function Modals({ modalsState }: modalsPropTypes
) {
	return (
		<>
			<SettingsModalContainer showModal={modalsState.isSettingsModalOpen} />
			<ModifierModalContainer showModal={modalsState.isModifierModalOpen} />
			<CoCModalContainer showModal={modalsState.isCoCModalOpen} />
			<WarhammerModalContainer showModal={modalsState.isWarhammerModalOpen} />
			<ConanModalContainer showModal={modalsState.isConanModalOpen} />
			<ResultsModalContainer />
		</>
	);
}

export default connect(mapStateToProps)(Modals);
