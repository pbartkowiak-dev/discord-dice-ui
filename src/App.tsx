import React from 'react';
import './App.css';
import DiceModuleContainer from './components/DiceModuleContainer';
import HeaderContainer from './components/HeaderContainer';
import SettingsModalContainer from './components/SettingsModalContainer';
import ModifierModalContainer from './components/ModifierModalContainer';

function App() {
	return (
		<div className="App">
			<ModifierModalContainer />
			<SettingsModalContainer />
			<HeaderContainer />
			<DiceModuleContainer />
		</div>
	);
}

export default App;
