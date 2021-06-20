import reduxStore from "../../store";
import joinAsBlocks from "../../utils/joinAsBlocks";
import { getColor } from "../../utils/getColor";
import { Result } from "./store";

interface Props {
	results: Result[];
	totalIcons: number;
	exaltedIcons: number;
	normalIcons: number;
	wrathDieResult: number;
	skillDice: number;
	isRerollingAllDice: boolean;
}

interface ReturnType {
	msgTitle: string;
	description: string;
	color: number;
}

export const getDiscordMsgData = ({
	results,
	totalIcons,
	exaltedIcons,
	normalIcons,
	wrathDieResult,
	skillDice,
	isRerollingAllDice
}: Props): ReturnType => {
	const { userSettings } = reduxStore.getState()
	const username = userSettings.username || 'USERNAME_MISSING';
	let msgTitle = '';
	let description = '';

	if (isRerollingAllDice) {
		msgTitle = `${username} __rerolled all__ \`${skillDice}d6\` dice`;
	} else {
		msgTitle = `${username} rolled \`${skillDice}d6\``;
	}

	description += '**Results**:';
	description += '\n';
	description += `\`${wrathDieResult}\` :skull:`;
	description += results[0].isRerolled ? '(rerolled)\n' : '';
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

	return {
		msgTitle,
		description,
		color: getColor()
	};
};