import reduxStore from "../../store";
import joinAsBlocks from "../../utils/joinAsBlocks";
import { FAILURE, getColor, SUCCESS } from "../../utils/getColor";
import { EYE_SCORE, GANDALF_SCORE } from "../../consts/torDice";

interface Props {
	isSuccess: boolean;
	featDiceResults: number[];
	successDiceResults: number[];
	featDieScore: number;
	totalDiceScore: number;
	wasRerolled: boolean;
	tn: string;
	isFavoured: boolean;
	isIllFavoured: boolean;
	isWeary: boolean;
	isMiserable: boolean;
	isAdversary: boolean;
	modifier: string;
}

interface Field {
	name: string;
	value: string;
}

interface ReturnType {
	msgTitle: string;
	description: string;
	fields: Field[];
	color: number;
}

const boldWrap = (string: string, condition: boolean) => {
	if (condition) {
		return `**${string}**`
	}
	return string;
}

export const GANDALF_DESCRIPTION = `${GANDALF_SCORE} (Gandalf Rune)`;
export const EYE_DESCRIPTION = `${EYE_SCORE} (Eye Symbol)`;

export const getDiscordMsgData = ({
	isSuccess,
	featDiceResults,
	successDiceResults,
	featDieScore,
	totalDiceScore,
	wasRerolled,
	tn,
	isFavoured,
	isIllFavoured,
	isWeary,
	isMiserable,
	isAdversary,
	modifier,
}: Props): ReturnType => {
	const { userSettings } = reduxStore.getState()
	const username = userSettings.username || 'USERNAME_MISSING';
	const fields: Field[] = [];

	const FAVOURED_DIE = isAdversary ? EYE_SCORE : GANDALF_SCORE;
	const ILL_FAVOURED_DIE = isAdversary ? GANDALF_SCORE : EYE_SCORE;
	const YES_ICON = ':heavy_check_mark:';
	const NO_ICON = ':heavy_multiplication_x:';

	let finalScore;

	if (isMiserable && featDieScore === ILL_FAVOURED_DIE) {
		finalScore = isAdversary ? GANDALF_DESCRIPTION : EYE_DESCRIPTION;
	} else if (featDieScore === FAVOURED_DIE) {
		finalScore = isAdversary ? EYE_DESCRIPTION : GANDALF_DESCRIPTION;
	} else {
		finalScore = totalDiceScore;
	}

	const msgTitle = `${username} ${wasRerolled ? '__rerolled__' : 'rolled'} \`${finalScore}\` against \`${tn}\` TN`;

	let description = isSuccess ? ':green_circle: **Success**' : ':red_circle: **Failure**';

	description += '\n';
	description += boldWrap(
		`${isFavoured ? YES_ICON : NO_ICON} Favoured Roll`,
		isFavoured
	);

	description += '\n';
	description += boldWrap(
		`${isIllFavoured ? YES_ICON : NO_ICON} Ill-Favoured Roll`,
		isIllFavoured
	);

	description += '\n';
	description += boldWrap(
		`${isWeary ? YES_ICON : NO_ICON} Weary`,
		isWeary
	);

	description += '\n';
	description += boldWrap(
		`${isMiserable ? YES_ICON : NO_ICON} Miserable`,
		isMiserable
	);

	description += '\n';
	description += boldWrap(
		`${isAdversary ? YES_ICON : NO_ICON} Adversary's Roll`,
		isAdversary
	);

	// SUCCESS DICE

	const successDiceResultsSorted =  successDiceResults.sort((a: number, b: number) => a - b);

	fields.push({
		name: `:game_die: ${successDiceResults.length === 1 ? 'Success Die Roll Result' : 'Success Dice Roll Results'}:`,
		value: joinAsBlocks(successDiceResultsSorted, null, true) as string
	});

	// MODIFIER
	const modifierNumber = Number(modifier);
	if (modifier && !isNaN(modifierNumber) && modifierNumber !== 0) {

		const modifierSymbol = modifierNumber > 0 ? '+' : '';
		const modifierIcon = modifierNumber > 0 ? ':heavy_plus_sign:' : ':heavy_minus_sign:';

		fields.push({
			name: modifierIcon + ' Modifier',
			value: joinAsBlocks([modifierSymbol + modifier], null, true) as string
		});
	}
	// FEAT DICE

	const featDiceResultsWithIcons = featDiceResults.map((result => {
		if (result === EYE_SCORE) {
			return EYE_DESCRIPTION;
		} else if (result === GANDALF_SCORE) {
			return GANDALF_DESCRIPTION;
		}
		return result;
	}));

	fields.push({
		name: `:zap: ${featDiceResults.length === 1 ? 'Feat Die Roll Result' : 'Feat Dice Roll Results'}:`,
		value: joinAsBlocks(featDiceResultsWithIcons, null, true) as string
	});

	// SPECIAL SUCCESSES

	const specialSuccessesAmount = successDiceResults.filter((result: number) => result === 6).length;

	if (specialSuccessesAmount && isSuccess) {
		fields.push({
			name: ':boom: Special Successes Amount:',
			value: `\`${specialSuccessesAmount}\``
		});
	}

	return {
		msgTitle,
		description,
		fields,
		color: isSuccess ? getColor(SUCCESS) : getColor(FAILURE),
	};
};
