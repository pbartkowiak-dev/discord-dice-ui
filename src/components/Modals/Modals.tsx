import React from 'react';
import { connect } from 'react-redux';

import SettingsModalContainer from '../SettingsModal/SettingsModalContainer';
import ModifierModalContainer from '../ModifierModal/ModifierModalContainer';
import ResultsModalContainer from '../ResultsModal/ResultsModalContainer';
import CoCModalContainer from '../CoCModal/CoCModalContainer';
import WarhammerModalContainer from '../WarhammerModal/WarhammerModalContainer';
import ConanModalContainer from '../ConanModal/ConanModalContainer';
import PoolBuilderModalContainer from '../PoolBuilderModal/PoolBuilderModalContainer';
import CopyrightModalContainer from '../CopyrightModal/CopyrightModalContainer';

import { ModalsStateTypes } from '../../reducers/modalsReducer';

type modalsPropTypes = {
	modalsState: ModalsStateTypes
}

const mapStateToProps = (state: any) => {
	return {
		modalsState: state.modalsState
	};
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
			<PoolBuilderModalContainer showModal={modalsState.isPoolBuilderModalOpen} />
			<CopyrightModalContainer showModal={modalsState.isCopyrightModalOpen} />
			<ResultsModalContainer />
		</>
	);
}

export default connect(mapStateToProps)(Modals);
