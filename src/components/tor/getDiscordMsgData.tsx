import reduxStore from "../../store";
import joinAsBlocks from "../../utils/joinAsBlocks";
import { getColor } from "../../utils/getColor";

interface Props {
	results: number[];
}

interface ReturnType {
	msgTitle: string;
	description: string;
	color: number;
}

export const getDiscordMsgData = ({
	results,
}: Props): ReturnType => {
	const { userSettings } = reduxStore.getState()
	const username = userSettings.username || 'USERNAME_MISSING';
	let msgTitle = 'msg title';

	// if (diceAdded) {
	// 	const dieWord = diceAdded === 1 ? 'die' : 'dice';
	// 	msgTitle = `${username} __added__ \`${diceAdded}\` ${dieWord}`;
	// } else if (isRerollingAllDice) {
	// 	msgTitle = `${username} __rerolled all__ \`${skillDice}d6\` dice`;
	// } else if (diceSelectedToReroll)	{
	// 	const dieWord = diceSelectedToReroll === 1 ? 'die' : 'dice';
	// 	msgTitle = `${username} __rerolled__ \`${diceSelectedToReroll}\` ${dieWord}`;
	// } else {
	// 	msgTitle = `${username} rolled \`${skillDice}d6\``;
	// }

	let description = '**Results**:';
	description += '\n';

	// description += `${joinAsBlocks(
	// 	results
	// 		// .filter((result) => !result.isWrathDie)
	// 		.map((result) => result.val)
	// 		.sort((a, b) => b - a),
	// 	', ',
	// 	true
	// )}.`;

	description += '\n';

	// description += '\n';
	// description += `**:star: Total Icons**: \`${totalIcons}\``;

	// description += '\n';
	// description += `**:arrow_double_up: Exalted Icons**: \`${exaltedIcons}\``;

	description += '\n';
	// description += `**:arrow_right: Normal Icons**: \`${normalIcons}\``;

	return {
		msgTitle,
		description,
		color: getColor()
	};
};
