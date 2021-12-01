import reduxStore from "../../store";

interface Props {
	isAnonymous: boolean;
}

interface ReturnType {
	msgTitle: string;
	description: string;
}

export const getDiscordMsgData = ({ isAnonymous }: Props): ReturnType => {
	const { userSettings } = reduxStore.getState()
	const username = userSettings.username || 'USERNAME_MISSING';
	const msgTitle = isAnonymous
		? 'Someone has thrown a X-Card. Please skip this scene and move on.'
		: `${username} has thrown a X-Card. Please skip this scene and move on.`

	let description = 'No further explanation is needed.'

	description += '\n';
	description += '\n';

	description  += '> When we use this card, we simply edit out anything X-Carded. And if there is ever an issue, anyone can call for a break and we can talk privately.'

	description  += '> For more details on X-Card please ask your GM or refer to http://tinyurl.com/x-card-rpg'

	return {
		msgTitle,
		description,
	};
};
