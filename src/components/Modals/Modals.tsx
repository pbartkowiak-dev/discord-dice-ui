import React from 'react';
import { connect } from 'react-redux';

import SettingsModalContainer from '../SettingsModal/SettingsModalContainer';
import ModifierModalContainer from '../ModifierModal/ModifierModalContainer';
import CthulhuModalContainer from '../CthulhuModal/CthulhuModalContainer';
import WarhammerModalContainer from '../WarhammerModal/WarhammerModalContainer';
import WarhammerMoneyModalContainer from '../WarhammerMoneyModal/WarhammerMoneyModalContainer';
import ConanModalContainer from '../ConanModal/ConanModalContainer';
import InfinityModalContainer from '../InfinityModal/InfinityModalContainer';
import PoolBuilderModalContainer from '../PoolBuilderModal/PoolBuilderModalContainer';
import CopyrightModalContainer from '../CopyrightModal/CopyrightModalContainer';

import ResultsModalContainer from '../ResultsModal/ResultsModalContainer';
import L5rResultsModalContainer from '../L5rResultsModal/L5rResultsModalContainer';
import RollAndKeepResultsModalContainer from '../RollAndKeepResultsModal/RollAndKeepResultsModalContainer';

import ConanTokensModalContainer from '../ConanTokensModal/ConanTokensModalContainer';
import InfinityTokensModalContainer from '../InfinityTokensModal/InfinityTokensModalContainer';
import NarrativeTokensModalContainer from '../NarrativeTokensModal/NarrativeTokensModalContainer';

import { ModalsStateTypes } from '../../reducers/modalsReducer';

import WarhammerResultsModal from "../WarhammerResultsModal/WarhammerResultsModal";
import CthulhuResultsModal from "../CthulhuResultsModal/CthulhuResultsModal";
import CthulhuSheetModal from "../CthulhuSheetModal/CthulhuSheetModal";

import CombatTrackerModal from "../CombatTracker/CombatTrackerModal";

interface modalsPropTypes {
	modalsState: ModalsStateTypes;
	warhammerState: any,
	cthulhuState: any
}

const mapStateToProps = ({ modalsState, warhammerState, cthulhuState }: any) => {
	return {
		modalsState,
		warhammerState,
		cthulhuState
	};
};

function Modals({ modalsState, warhammerState, cthulhuState }: modalsPropTypes) {
	return (
		<>
			<SettingsModalContainer showModal={modalsState.isSettingsModalOpen} />
			<ModifierModalContainer showModal={modalsState.isModifierModalOpen} />
			<CthulhuModalContainer showModal={cthulhuState.showModal} />
			<WarhammerModalContainer showModal={warhammerState.showModal} />
			<WarhammerMoneyModalContainer showModal={modalsState.isWarhammerMoneyModalOpen} />
			<ConanModalContainer showModal={modalsState.isConanModalOpen} />
			<InfinityModalContainer showModal={modalsState.isInfinityModalOpen} />
			<PoolBuilderModalContainer showModal={modalsState.isPoolBuilderModalOpen} />
			<CopyrightModalContainer showModal={modalsState.isCopyrightModalOpen} />
			<ResultsModalContainer />
			<RollAndKeepResultsModalContainer />
			<ConanTokensModalContainer />
			<InfinityTokensModalContainer />
			<NarrativeTokensModalContainer />

			<L5rResultsModalContainer />
			<WarhammerResultsModal />
			<CthulhuResultsModal />
			<CthulhuSheetModal />
			<CombatTrackerModal />
		</>
	);
}

export default connect(mapStateToProps)(Modals);
