import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import DiceModuleOptions from './components/DiceModuleOptions/DiceModuleOptions';
import DiceModuleContainer from './components/DiceModule/DiceModuleContainer';
import NarrativeDicePoolBuilderContainer from './components/NarrativeDicePoolBuilder/NarrativeDicePoolBuilderContainer';
import Modals from './components/Modals/Modals';

function App({ rollOptions }: any) {
	let diceModule;

	if (rollOptions?.narrativeDice) {
		diceModule = <NarrativeDicePoolBuilderContainer />
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
