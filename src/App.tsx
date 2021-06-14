import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import DiceModuleOptions from './components/DiceModuleOptions/DiceModuleOptions';
import DiceModule from './components/DiceModule/DiceModule';
import NarrativeDicePoolBuilder from './components/NarrativeDicePoolBuilder/NarrativeDicePoolBuilder';
import L5rDicePoolBuilder from './components/L5rDicePoolBuilder/L5rDicePoolBuilder';
import RollAndKeepPoolBuilder from './components/RollAndKeepPoolBuilder/RollAndKeepPoolBuilder';
import WrathAndGloryPoolBuilder from './components/WrathAndGloryPoolBuilder/WrathAndGloryPoolBuilder';
import Modals from './components/Modals/Modals';
import LocalStorageManager from "./components/LocalStorageManager/LocalStorageManager";
import useDiceModuleFormStore from './components/DiceModuleOptions/store';

function App() {
	const { narrativeDice, l5rMode, rollAndKeepMode, wrathAndGloryMode } = useDiceModuleFormStore(( { state }) => state);

	return (
		<div className="App">
			<Modals />
			<HeaderContainer />
			<div className="dice-module-container">
				<DiceModuleOptions />
				{ narrativeDice && <NarrativeDicePoolBuilder /> }
				{ l5rMode && <L5rDicePoolBuilder /> }
				{ rollAndKeepMode && <RollAndKeepPoolBuilder /> }
				{ wrathAndGloryMode && <WrathAndGloryPoolBuilder /> }
				{ !narrativeDice && !l5rMode && !rollAndKeepMode && !wrathAndGloryMode && <DiceModule /> }
			</div>
			<LocalStorageManager />
		</div>
	);
}

export default App;
