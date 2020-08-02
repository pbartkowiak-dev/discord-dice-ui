import React from 'react';
import DiceModuleContainer from './components/DiceModule/DiceModuleContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Modals from './components/Modals/Modals';

function App() {
	return (
		<div className="App">
			<Modals />
			<HeaderContainer />
			<DiceModuleContainer />
		</div>
	);
}

export default App;
