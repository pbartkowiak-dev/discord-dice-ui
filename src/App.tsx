import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import DiceModuleOptions from './components/DiceModuleOptions/DiceModuleOptions';
import DiceModuleContainer from './components/DiceModule/DiceModuleContainer';
import NarrativeDicePoolBuilderContainer from './components/NarrativeDicePoolBuilder/NarrativeDicePoolBuilderContainer';
import L5rDicePoolBuilderContainer from './components/L5rDicePoolBuilder/L5rDicePoolBuilderContainer';
import Modals from './components/Modals/Modals';

function App({ rollOptions }: any) {
	let diceModule;

	if (rollOptions?.narrativeDice) {
		diceModule = <NarrativeDicePoolBuilderContainer />
	} else if (rollOptions?.l5rMode) {
		diceModule = <L5rDicePoolBuilderContainer />
	} else {
		diceModule = <DiceModuleContainer />;
	}

	return (
		<div className="App">
			<Modals />
			<HeaderContainer />
			<div className="dice-module-container">
				<DiceModuleOptions rollOptions={rollOptions} />
				{ diceModule }
			</div>
		</div>
	);
}

export default App;
