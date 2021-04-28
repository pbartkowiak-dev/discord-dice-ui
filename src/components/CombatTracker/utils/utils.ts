import { CombatantTypes, CreateCombatant } from "../store";
import { combatantLengthMax, conditionsMaxLength, hpMaxValue, initiativeMaxValue, woundsMaxLength, maxAdvantageValue } from "../consts";

export const createCombatantId = () => Date.now();

export function createCombatant( combatantData: CreateCombatant): CombatantTypes {
	return {
		...combatantData,
		wounds: '',
		conditions: '',
		id: createCombatantId(),
		isLocked: false,
		hpMax: combatantData.hp,
		advantage: 0
	};
}

interface ValidateCombatantFields {
	initiative?: number;
	name?: string;
	hp?: number;
	hpMax?: number;
	conditions?: string;
	wounds?: string;
	advantage?: number;
}

const isUndef = (v: any ): boolean => typeof v === 'undefined';

export const validateCombatantFields = ({
	initiative,
	name,
	hp,
	hpMax,
	conditions,
	wounds,
	advantage
}: ValidateCombatantFields): string => {
	let error = '';

	if (!isUndef(initiative) && isNaN(initiative!)) {
		error = 'Initiative value is not a number';
	} else if (!isUndef(hp) && isNaN(hp!)) {
		error = 'HP value is not a number';
	} else if (!isUndef(initiative) && initiative! > initiativeMaxValue) {
		error = 'Initiative value is too high';
	} else if (!isUndef(hpMax) && hpMax! > hpMaxValue) {
		error = 'Maximum HP value is too high';
	} else if (!isUndef(hp) && hp! > hpMaxValue) {
		error = 'HP value is too high';
	} else if (!isUndef(initiative) && initiative! < 0) {
		error = 'Initiative has to be greater or equal to 0';
	} else if (!isUndef(hp) && hp! < 0) {
		error = 'HP has to be greater or equal to 0';
	} else if (!isUndef(name) && name!.length === 0) {
		error = 'Name cannot be empty'
	} else if (!isUndef(name) && name!.length > combatantLengthMax) {
		error = 'Name is too long';
	} else if(!isUndef(conditions) && conditions!.length > conditionsMaxLength) {
		error = 'Conditions value are too long';
	} else if(!isUndef(wounds) && wounds!.length > woundsMaxLength) {
		error = 'Wounds value are too long';
	} else if(!isUndef(advantage) && isNaN(advantage!)) {
		error = 'Advantage value is not a number';
	} else if(!isUndef(advantage) && advantage! > maxAdvantageValue) {
		error = 'Advantage value is too high';
	}

	return error;
};

export const chunkString = (str: string, size: number) => {
	return str.match(new RegExp('.{1,' + size + '}', 'g')) || [];
}
