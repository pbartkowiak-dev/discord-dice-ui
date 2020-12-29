import React from 'react';
import { connect } from 'react-redux';

import SettingsModalContainer from '../SettingsModal/SettingsModalContainer';
import ModifierModalContainer from '../ModifierModal/ModifierModalContainer';
import CoCModalContainer from '../CoCModal/CoCModalContainer';
import WarhammerModalContainer from '../WarhammerModal/WarhammerModalContainer';
import ConanModalContainer from '../ConanModal/ConanModalContainer';
import PoolBuilderModalContainer from '../PoolBuilderModal/PoolBuilderModalContainer';
import CopyrightModalContainer from '../CopyrightModal/CopyrightModalContainer';

import ResultsModalContainer from '../ResultsModal/ResultsModalContainer';
import L5eResultsModalContainer from '../ResultsModal/L5rResultsModalContainer';

import ConanTokensModalContainer from '../ConanTokensModal/ConanTokensModalContainer';

import { ModalsStateTypes } from '../../reducers/modalsReducer';

type modalsPropTypes = {
	modalsState: ModalsStateTypes
}

const mapStateToProps = (state: any) => {
	return {
		modalsState: state.modalsState
	};
}

function Modals({ modalsState }: modalsPropTypes) {
	return (
		<>
			<SettingsModalContainer showModal={modalsState.isSettingsModalOpen} />
			<ModifierModalContainer showModal={modalsState.isModifierModalOpen} />
			<CoCModalContainer showModal={modalsState.isCoCModalOpen} />
			<WarhammerModalContainer showModal={modalsState.isWarhammerModalOpen} />
			<ConanModalContainer showModal={modalsState.isConanModalOpen} />
			<PoolBuilderModalContainer showModal={modalsState.isPoolBuilderModalOpen} />
			<CopyrightModalContainer showModal={modalsState.isCopyrightModalOpen} />
			<ResultsModalContainer />
			<L5eResultsModalContainer />
			<ConanTokensModalContainer />
		</>
	);
}

export default connect(mapStateToProps)(Modals);
