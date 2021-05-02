// @ts-nocheck
import React from 'react';
import Form from 'react-bootstrap/Form';
import useDiceModuleFormStore from './store';
import './DiceModuleForm.css';

function DiceModuleForm() {
	const { state, toggle } = useDiceModuleFormStore();

	const handleChange = (key: string) => toggle(key);

	const fields = [{
		label: 'Use Modifier',
		name: 'useModifier',
		isDisabled: s => s.narrativeDice || s.rollAndKeepMode
	},{
		label: 'Call of Cthulhu 7e',
		name: 'cthulhuMode',
		isDisabled: s => s.warhammerMode || s.conanMode || s.infinityMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode
	},{
		label: 'Warhammer',
		name: 'warhammerMode',
		isDisabled: s => s.cthulhuMode || s.conanMode || s.infinityMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode
	},{
		label: 'Conan 2d20',
		name: 'conanMode',
		isDisabled: s => s.cthulhuMode || s.warhammerMode || s.infinityMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode
	},{
		label: 'Infinity 2d20',
		name: 'infinityMode',
		isDisabled: s => s.cthulhuMode || s.warhammerMode || s.conanMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode
	},{
		label: 'Narrative Dice',
		name: 'narrativeDice',
		isDisabled: s => s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.l5rMode || s.fateMode || s.rollAndKeepMode
	},{
		label: 'Fate',
		name: 'fateMode',
		isDisabled: s => s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.l5rMode || s.rollAndKeepMode
	},{
		label: 'Roll and Keep',
		name: 'rollAndKeepMode',
		isDisabled: s => s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.fateMode || s.l5rMode
	},{
		label: 'L5R 5e',
		name: 'l5rMode',
		isDisabled: s => s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.fateMode || s.rollAndKeepMode
	}];

	console.log('dceModuleFormStore', state);

	return (
		<div className="dice-module dice-form"> {
			fields.map(({ label, name, isDisabled }) => (
				<Form.Check
					type="checkbox"
					label={label}
					name={name}
					id={name}
					key={name}
					checked={state[name]}
					disabled={isDisabled(state)}
					onChange={() => handleChange(name)}
					custom
				/>
			))
		} </div>
	);
}

export default DiceModuleForm;
