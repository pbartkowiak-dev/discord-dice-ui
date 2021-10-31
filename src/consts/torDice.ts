import { TOR_FEAT_DIE, TOR_SKILL_DIE, TOR_SKILL_TEST } from "./diceConstants";

export const torSkillTest = {
	diceType: TOR_SKILL_TEST,
	label: 'Skill Test',
	diceImg: 'tor-skill-test.png',
	noDropdown: true
};

export const torSkillDie = {
	diceType: TOR_SKILL_DIE,
	label: 'Skill Die',
	diceImg: 'tor-skill-die.png',
};

export const torFeatDie = {
	diceType: TOR_FEAT_DIE,
	label: 'Feature Die',
	diceImg: 'tor-feat-die.png',
};
