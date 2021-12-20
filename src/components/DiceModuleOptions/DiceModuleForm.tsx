// @ts-nocheck
import React from 'react';
import Form from 'react-bootstrap/Form';
import useDiceModuleFormStore from './store';
import './DiceModuleForm.css';

function DiceModuleForm() {
	const { mode, toggleMode, useModifier, toggleModifier } = useDiceModuleFormStore();
	const disableModifier =
		mode === 'wrathAndGloryMode' ||
		mode === 'narrativeDice' ||
		mode === 'rollAndKeepMode' ||
		mode === 'torMode';

	return (
		<div>
			<div className="dice-module dice-form">
				<Form.Check
					type="checkbox"
					label='Use Modifier'
					name='useModifier'
					id='useModifier'
					key='useModifier'
					checked={useModifier}
					disabled={disableModifier}
					onChange={toggleMode}
					custom
				/>
			</div>
			<div className="dice-module dice-form">
				<Form.Check
					type="radio"
					label='None'
					name='none'
					id='none'
					key='none'
					checked={state.cthulhuMode}
					onChange={() => toggleMode('cthulhuMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Call of Cthulhu 7e'
					name='cthulhuMode'
					id='cthulhuMode'
					key='cthulhuMode'
					checked={state.cthulhuMode}
					onChange={() => toggleMode('cthulhuMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Warhammer'
					name='warhammerMode'
					id='warhammerMode'
					key='warhammerMode'
					checked={state.warhammerMode}
					onChange={() => toggleMode('warhammerMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Conan 2d20'
					name='conanMode'
					id='conanMode'
					key='conanMode'
					checked={state.conanMode}
					onChange={() => toggleMode('conanMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Infinity 2d20'
					name='infinityMode'
					id='infinityMode'
					key='infinityMode'
					checked={state.infinityMode}
					onChange={() => toggleMode('infinityMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Narrative Dice'
					name='narrativeDice'
					id='narrativeDice'
					key='narrativeDice'
					checked={state.narrativeDice}
					onChange={() => toggleMode('narrativeDice')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Fate'
					name='fateMode'
					id='fateMode'
					key='fateMode'
					checked={state.fateMode}
					onChange={() => toggleMode('fateMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Roll and Keep'
					name='rollAndKeepMode'
					id='rollAndKeepMode'
					key='rollAndKeepMode'
					checked={state.rollAndKeepMode}
					onChange={() => toggleMode('rollAndKeepMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='L5R 5e'
					name='l5rMode'
					id='l5rMode'
					key='l5rMode'
					checked={state.l5rMode}
					onChange={() => toggleMode('l5rMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Wrath and Glory'
					name='wrathAndGloryMode'
					id='wrathAndGloryMode'
					key='wrathAndGloryMode'
					checked={state.wrathAndGloryMode}
					onChange={() => toggleMode('wrathAndGloryMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='The One Ring 2e'
					name='torMode'
					id='torMode'
					key='torMode'
					checked={state.torMode}
					onChange={() => toggleMode('torMode')}
					custom
				/>
			</div>
		</div>
	);
}

export default DiceModuleForm;
