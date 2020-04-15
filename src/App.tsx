import React from 'react';
import './App.css';
import DiceModuleContainer from './components/DiceModule/DiceModuleContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import SettingsModalContainer from './components/SettingsModal/SettingsModalContainer';
import ModifierModalContainer from './components/ModifierModal/ModifierModalContainer';
import NotificationsContainer from './components/Notifications/NotificationsContainer';

function App() {
	return (
		<div className="App">
			<NotificationsContainer />
			<ModifierModalContainer />
			<SettingsModalContainer />
			<HeaderContainer />
			<DiceModuleContainer />
		</div>
	);
}

export default App;
