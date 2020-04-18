import React from 'react';
import DiceModuleContainer from './components/DiceModule/DiceModuleContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import SettingsModalContainer from './components/SettingsModal/SettingsModalContainer';
import ModifierModalContainer from './components/ModifierModal/ModifierModalContainer';
import ResultsModalContainer from './components/ResultsModal/ResultsModalContainer';

function App() {
	return (
		<div className="App">
			<ResultsModalContainer />
			<ModifierModalContainer />
			<SettingsModalContainer />
			<HeaderContainer />
			<DiceModuleContainer />
		</div>
	);
}

export default App;
