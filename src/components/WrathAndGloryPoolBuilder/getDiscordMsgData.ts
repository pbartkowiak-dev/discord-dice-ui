import reduxStore from "../../store";
import joinAsBlocks from "../../utils/joinAsBlocks";
import { getColor } from "../../utils/getColor";
import { Result } from "./store";

interface Props {
	results: Result[];
	diceAddedResults?: Result[];
	totalIcons: number;
	exaltedIcons: number;
	normalIcons: number;
	wrathDieResults: number[];
	skillDice?: number;
	diceAdded?: number;
	isRerollingAllDice?: boolean;
	diceSelectedToReroll?: number;
}

interface ReturnType {
	msgTitle: string;
	description: string;
	color: number;
}

export const getDiscordMsgData = ({
	results,
	diceAddedResults,
	totalIcons,
	exaltedIcons,
	normalIcons,
	wrathDieResults,
	skillDice,
	diceAdded,
	isRerollingAllDice,
	diceSelectedToReroll
}: Props): ReturnType => {
	const { userSettings } = reduxStore.getState()
	const username = userSettings.username || 'USERNAME_MISSING';
	let msgTitle: string;

	if (diceAdded) {
		const dieWord = diceAdded === 1 ? 'die' : 'dice';
		msgTitle = `${username} __added__ \`${diceAdded}\` ${dieWord}`;
	} else if (isRerollingAllDice) {
		msgTitle = `${username} __rerolled all__ \`${skillDice}d6\` dice`;
	} else if (diceSelectedToReroll)	{
		const dieWord = diceSelectedToReroll === 1 ? 'die' : 'dice';
		msgTitle = `${username} __rerolled__ \`${diceSelectedToReroll}\` ${dieWord}`;
	} else {
		msgTitle = `${username} rolled \`${skillDice}d6\``;
	}

	let description = '**Results**:';
	description += '\n';
	if (wrathDieResults.length) {
		description += ':skull: '
		description += `${joinAsBlocks(
			wrathDieResults.sort((a, b) => b - a),
			', ',
			true
		)}.`;
		description += '\n';
	}

	if (results.length - wrathDieResults.length > 0) {
		description += `${joinAsBlocks(
			results
				.filter((result) => !result.isWrathDie)
				.map((result) => result.val)
				.sort((a, b) => b - a),
			', ',
			true
		)}.`;

		description += '\n';
	}

	description += '\n';
	description += `**:star: Total Icons**: \`${totalIcons}\``;

	description += '\n';
	description += '\n';
	description += `**:arrow_double_up: Exalted Icons**: \`${exaltedIcons}\``;

	description += '\n';
	description += `**:arrow_right: Normal Icons**: \`${normalIcons}\``;

	if (wrathDieResults.length) {
		description += '\n';
		const wrathDiceResult = joinAsBlocks(wrathDieResults, ', ', true);

		if (wrathDieResults.length === 1) {
			description += `**:skull: Wrath Die**: ${wrathDiceResult}`;
		} else {
			description += `**:skull: Wrath Dice**: ${wrathDiceResult}`;
		}
	}

	if (diceAddedResults?.length) {
		const dieWord = diceAdded === 1 ? 'die' : 'dice';
		const resultWord = diceAdded === 1 ? 'result' : 'results';

		description += '\n';
		description += `:game_die: **Added ${dieWord} ${resultWord}**: `;
		description += `${joinAsBlocks(
			diceAddedResults
				.map((result) => result.val)
				.sort((a, b) => b - a),
			', ',
			true
		)}.`;
		description += '\n';
	}

	return {
		msgTitle,
		description,
		color: getColor()
	};
};
