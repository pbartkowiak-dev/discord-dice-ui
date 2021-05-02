import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import DiceModuleOptions from './components/DiceModuleOptions/DiceModuleOptions';
import DiceModuleContainer from './components/DiceModule/DiceModuleContainer';
import NarrativeDicePoolBuilderContainer from './components/NarrativeDicePoolBuilder/NarrativeDicePoolBuilderContainer';
import L5rDicePoolBuilderContainer from './components/L5rDicePoolBuilder/L5rDicePoolBuilderContainer';
import RollAndKeepPoolBuilderContainer from './components/RollAndKeepPoolBuilder/RollAndKeepPoolBuilderContainer';
import Modals from './components/Modals/Modals';
import LocalStorageManager from "./components/LocalStorageManager/LocalStorageManager";
import useDiceModuleFormStore from './components/DiceModuleOptions/store';

function App() {
	const diceModuleFormState = useDiceModuleFormStore(( { state }) => state);
	let diceModule;

	if (diceModuleFormState.narrativeDice) {
		diceModule = <NarrativeDicePoolBuilderContainer />
	} else if (diceModuleFormState.l5rMode) {
		diceModule = <L5rDicePoolBuilderContainer />
	} else if (diceModuleFormState.rollAndKeepMode) {
		diceModule = <RollAndKeepPoolBuilderContainer />
	} else {
		diceModule = <DiceModuleContainer />;
	}

	return (
		<div className="App">
			<Modals />
			<HeaderContainer />
			<div className="dice-module-container">
				<DiceModuleOptions />
				{ diceModule }
			</div>
			<LocalStorageManager />
		</div>
	);
}

export default App;
