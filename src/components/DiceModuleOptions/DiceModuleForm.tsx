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
					onChange={toggleModifier}
					custom
				/>
			</div>
			<h5 className="dice-module-header">Select a game mode</h5>
			<div className="dice-module dice-form">
				<Form.Check
					type="radio"
					label='None'
					name='none'
					id='none'
					key='none'
					checked={mode === 'none'}
					onChange={() => toggleMode('none')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Call of Cthulhu 7e'
					name='cthulhuMode'
					id='cthulhuMode'
					key='cthulhuMode'
					checked={mode === 'cthulhuMode'}
					onChange={() => toggleMode('cthulhuMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Warhammer'
					name='warhammerMode'
					id='warhammerMode'
					key='warhammerMode'
					checked={mode === 'warhammerMode'}
					onChange={() => toggleMode('warhammerMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Conan 2d20'
					name='conanMode'
					id='conanMode'
					key='conanMode'
					checked={mode === 'conanMode'}
					onChange={() => toggleMode('conanMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Infinity 2d20'
					name='infinityMode'
					id='infinityMode'
					key='infinityMode'
					checked={mode === 'infinityMode'}
					onChange={() => toggleMode('infinityMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Narrative Dice'
					name='narrativeDice'
					id='narrativeDice'
					key='narrativeDice'
					checked={mode === 'narrativeDice'}
					onChange={() => toggleMode('narrativeDice')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Fate'
					name='fateMode'
					id='fateMode'
					key='fateMode'
					checked={mode === 'fateMode'}
					onChange={() => toggleMode('fateMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Roll and Keep'
					name='rollAndKeepMode'
					id='rollAndKeepMode'
					key='rollAndKeepMode'
					checked={mode === 'rollAndKeepMode'}
					onChange={() => toggleMode('rollAndKeepMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='L5R 5e'
					name='l5rMode'
					id='l5rMode'
					key='l5rMode'
					checked={mode === 'l5rMode'}
					onChange={() => toggleMode('l5rMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='Wrath and Glory'
					name='wrathAndGloryMode'
					id='wrathAndGloryMode'
					key='wrathAndGloryMode'
					checked={mode === 'wrathAndGloryMode'}
					onChange={() => toggleMode('wrathAndGloryMode')}
					custom
				/>
				<Form.Check
					type="radio"
					label='The One Ring 2e'
					name='torMode'
					id='torMode'
					key='torMode'
					checked={mode === 'torMode'}
					onChange={() => toggleMode('torMode')}
					custom
				/>
			</div>
		</div>
	);
}

export default DiceModuleForm;
