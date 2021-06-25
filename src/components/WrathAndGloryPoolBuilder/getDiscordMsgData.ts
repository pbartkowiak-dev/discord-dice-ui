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
	wrathDieResult: number;
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
	wrathDieResult,
	skillDice,
	diceAdded,
	isRerollingAllDice,
	diceSelectedToReroll
}: Props): ReturnType => {
	const { userSettings } = reduxStore.getState()
	const username = userSettings.username || 'USERNAME_MISSING';
	let msgTitle = '';
	let description = '';

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

	description += '**Results**:';
	description += '\n';
	description += `\`${wrathDieResult}\` :skull:`;
	description += results[0].isRerolled ? '(rerolled)' : '';
	description += '\n';

	description += `${joinAsBlocks(
		results
			.filter((_, index) => index)
			.map((result) => result.val)
			.sort((a, b) => b - a),
		', ',
		true
	)}.`;

	description += '\n';
	description += '\n';
	description += `**:star: Total Icons**: \`${totalIcons}\``;

	description += '\n';
	description += '\n';
	description += `**:arrow_double_up: Exalted Icons**: \`${exaltedIcons}\``;

	description += '\n';
	description += `**:arrow_right: Normal Icons**: \`${normalIcons}\``;

	description += '\n';
	description += `**:skull: Wrath Die**: \`${wrathDieResult}\``;


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