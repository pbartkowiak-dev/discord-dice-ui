import React from 'react';
import { connect } from 'react-redux';

import SettingsModalContainer from '../SettingsModal/SettingsModalContainer';
import ModifierModalContainer from '../ModifierModal/ModifierModalContainer';
import CoCModalContainer from '../CoCModal/CoCModalContainer';
import WarhammerModalContainer from '../WarhammerModal/WarhammerModalContainer';
import WarhammerMoneyModalContainer from '../WarhammerMoneyModal/WarhammerMoneyModalContainer';
import ConanModalContainer from '../ConanModal/ConanModalContainer';
import InfinityModalContainer from '../InfinityModal/InfinityModalContainer';
import PoolBuilderModalContainer from '../PoolBuilderModal/PoolBuilderModalContainer';
import CopyrightModalContainer from '../CopyrightModal/CopyrightModalContainer';

import ResultsModalContainer from '../ResultsModal/ResultsModalContainer';
import L5rResultsModalContainer from '../ResultsModal/L5rResultsModal/L5rResultsModalContainer';
import RollAndKeepResultsModalContainer from '../ResultsModal/RollAndKeepResultsModal/RollAndKeepResultsModalContainer';

import ConanTokensModalContainer from '../ConanTokensModal/ConanTokensModalContainer';
import InfinityTokensModalContainer from '../InfinityTokensModal/InfinityTokensModalContainer';
import NarrativeTokensModalContainer from '../NarrativeTokensModal/NarrativeTokensModalContainer';

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
			<WarhammerMoneyModalContainer showModal={modalsState.isWarhammerMoneyModalOpen} />
			<ConanModalContainer showModal={modalsState.isConanModalOpen} />
			<InfinityModalContainer showModal={modalsState.isInfinityModalOpen} />
			<PoolBuilderModalContainer showModal={modalsState.isPoolBuilderModalOpen} />
			<CopyrightModalContainer showModal={modalsState.isCopyrightModalOpen} />
			<ResultsModalContainer />
			<RollAndKeepResultsModalContainer />
			<L5rResultsModalContainer />
			<ConanTokensModalContainer />
			<InfinityTokensModalContainer />
			<NarrativeTokensModalContainer />
		</>
	);
}

export default connect(mapStateToProps)(Modals);
