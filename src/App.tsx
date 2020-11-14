import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import DiceModuleOptions from './components/DiceModuleOptions/DiceModuleOptions';
import DiceModuleContainer from './components/DiceModule/DiceModuleContainer';
import EotePoolBuilderContainer from './components/EotePoolBuilder/EotePoolBuilderContainer';
import Modals from './components/Modals/Modals';

function App({ rollOptions }: any) {
	let diceModule;

	console.log('app rollOptions', rollOptions);

	if (rollOptions?.eoteMode) {
		diceModule = <EotePoolBuilderContainer />
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
