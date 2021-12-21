import React, { useEffect } from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import DiceModuleOptions from './components/DiceModuleOptions/DiceModuleOptions';
import DiceModule from './components/DiceModule/DiceModule';
import NarrativeDicePoolBuilder from './components/NarrativeDicePoolBuilder/NarrativeDicePoolBuilder';
import L5rDicePoolBuilder from './components/L5rDicePoolBuilder/L5rDicePoolBuilder';
import RollAndKeepPoolBuilder from './components/RollAndKeepPoolBuilder/RollAndKeepPoolBuilder';
import WrathAndGloryPoolBuilder from './components/WrathAndGloryPoolBuilder/WrathAndGloryPoolBuilder';
import Modals from './components/Modals/Modals';
import LocalStorageManager from "./components/LocalStorageManager/LocalStorageManager";
import useDiceModuleFormStore, { Mode, modes } from './components/DiceModuleOptions/store';
import queryParamsManager from "./utils/queryParamsManager";
import localStoreModeManager from "./utils/localStoreModeManager";

function App() {
	const { mode, toggleMode } = useDiceModuleFormStore(( state ) => state);
	const showDiceModule =
		mode !== 'narrativeDice' &&
		mode !== 'l5rMode' &&
		mode !== 'rollAndKeepMode' &&
		mode !== 'wrathAndGloryMode';

	useEffect(() => {
		const queryMode = queryParamsManager.get('mode') as Mode;
		if (queryMode && modes.includes(queryMode)) {
			toggleMode(queryMode);
		} else {
			const localStorageMode = localStoreModeManager.load();
			if (localStorageMode && modes.includes(localStorageMode)) {
				toggleMode(localStorageMode);
			}
		}
	}, [toggleMode]);

	return (
		<div className="App">
			<Modals />
			<HeaderContainer />
			<div className="dice-module-container">
				<DiceModuleOptions />
				{ mode === 'narrativeDice' && <NarrativeDicePoolBuilder /> }
				{ mode === 'l5rMode' && <L5rDicePoolBuilder /> }
				{ mode === 'rollAndKeepMode' && <RollAndKeepPoolBuilder /> }
				{ mode === 'wrathAndGloryMode' && <WrathAndGloryPoolBuilder /> }
				{ showDiceModule && <DiceModule /> }
			</div>
			<LocalStorageManager />
		</div>
	);
}

export default App;
