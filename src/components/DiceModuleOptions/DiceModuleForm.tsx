// @ts-nocheck
import React from 'react';
import Form from 'react-bootstrap/Form';
import useDiceModuleFormStore from './store';
import './DiceModuleForm.css';

function DiceModuleForm() {
	const { state, toggle } = useDiceModuleFormStore();

	const fields = [{
		label: 'Use Modifier',
		name: 'useModifier',
		isDisabled: s => s.wrathAndGloryMode || s.narrativeDice || s.rollAndKeepMode
	},{
		label: 'Call of Cthulhu 7e',
		name: 'cthulhuMode',
		isDisabled: s => s.wrathAndGloryMode || s.warhammerMode || s.conanMode || s.infinityMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode || s.torMode
	},{
		label: 'Warhammer',
		name: 'warhammerMode',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.conanMode || s.infinityMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode || s.torMode
	},{
		label: 'Conan 2d20',
		name: 'conanMode',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.warhammerMode || s.infinityMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode || s.torMode
	},{
		label: 'Infinity 2d20',
		name: 'infinityMode',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.warhammerMode || s.conanMode || s.narrativeDice || s.l5rMode || s.fateMode || s.rollAndKeepMode || s.torMode
	},{
		label: 'Narrative Dice',
		name: 'narrativeDice',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.l5rMode || s.fateMode || s.rollAndKeepMode || s.torMode
	},{
		label: 'Fate',
		name: 'fateMode',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.l5rMode || s.rollAndKeepMode || s.torMode
	},{
		label: 'Roll and Keep',
		name: 'rollAndKeepMode',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.fateMode || s.l5rMode || s.torMode
	},{
		label: 'L5R 5e',
		name: 'l5rMode',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.fateMode || s.rollAndKeepMode || s.torMode
	}, {
		label: 'Wrath and Glory',
		name: 'wrathAndGloryMode',
		isDisabled: s => s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.fateMode || s.rollAndKeepMode || s.l5rMode || s.torMode
	}, {
		label: 'The One Ring 2e',
		name: 'torMode',
		isDisabled: s => s.wrathAndGloryMode || s.cthulhuMode || s.conanMode || s.infinityMode || s.warhammerMode || s.narrativeDice || s.fateMode || s.rollAndKeepMode || s.l5rMode
	}];

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
					onChange={() => toggle(name)}
					custom
				/>
			))
		} </div>
	);
}

export default DiceModuleForm;
