import React from 'react';
import './App.css';
import DiceModuleContainer from './components/DiceModuleContainer';
import HeaderContainer from './components/HeaderContainer';
import SettingsModalContainer from './components/SettingsModalContainer';

function App() {
	return (
		<div className="App">
			<SettingsModalContainer />
			<HeaderContainer />
			<DiceModuleContainer />
		</div>
	);
}

export default App;
