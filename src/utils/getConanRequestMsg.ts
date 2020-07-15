import { requestParams } from './request';
import getConanSuccessLevel, { conanSuccessLevelType } from './getConanSuccessLevel';
import joinAsBlocks from './joinAsBlocks';
import { SUCCESS, FAILURE, getColor } from './getColor';

const getConanRequestMsg = (result:any, rollOptions:any, userSettings:any) => {
	const { results, assistanceDiceResults } = result;
	const {
		dice,
		difficulty,
		focus,
		fortune,
		tn,
		untrainedTest
	} = rollOptions;
	const username = userSettings.username || 'USERNAME_MISSING'
	const fields = [];
	const resultsJoined = joinAsBlocks(results, null, true);
	const msgTitle = `${username} rolled **\`${dice}d20\`**. Results: ${resultsJoined}.`;
	let assistanceSuccessLevel:any = {};
	let description;

	if (rollOptions.assistanceDice && assistanceDiceResults) {
		assistanceSuccessLevel = getConanSuccessLevel(
			assistanceDiceResults,
			Number(tn),
			Number(focus),
			Number(difficulty),
			untrainedTest
		);
	}

	const successLevel:conanSuccessLevelType = getConanSuccessLevel(
		results,
		Number(tn),
		Number(focus),
		Number(difficulty),
		untrainedTest,
		assistanceSuccessLevel.successLevel
	);
	const successLevelIcon = successLevel.isSuccess ? ':green_circle:' : ':red_circle:';

	description = `Successes: \`${successLevel.successLevel}\` vs. Difficulty: \`${difficulty}\``;
	description += `\nFocus: \`${focus || 0}\``;
	description += `\nTN: \`${tn}\``;

	if (fortune && Number(fortune) > 0) {
		description += `\nFortune points used: \`${fortune}\``;
	}
	
	if (untrainedTest) {
		description += `\nUntrained Test`;
	}

	if (rollOptions.assistanceDice && assistanceDiceResults && assistanceDiceResults.length) {
		const assistanceDiceResultsJoined = joinAsBlocks(assistanceDiceResults, null, true);
		let value = `:game_die: Rolled: ${assistanceDiceResultsJoined}\n:boom: Successes: \`${assistanceSuccessLevel.successLevel}\``;
		if (assistanceSuccessLevel.complications) {
			value = value + `\n:black_circle: Complications: \`${assistanceSuccessLevel.complications}\``;
		}
		fields.push({
			name: `:busts_in_silhouette: Assistance roll:`,
			value
		});
	}

	if (rollOptions.rerolledTimes) {
		const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';

		fields.push({
			name: `:game_die: Rerolled:`,
			value: `Rerolled \`${rollOptions.rerolledTimes}\` ${timesWord}`
		});
	}

	if (successLevel.complications) {
		fields.push({
			name: `:black_circle: Complications:`,
			value: `\`${successLevel.complications}\``
		});
	}

	fields.push({
		name: successLevelIcon + ' Roll result:',
		value: successLevel.isSuccess ? 'SUCCESS' : 'FAILURE'
	});

	fields.push({
		name: `:crossed_swords: Momentum generated:`,
		value: `\`${successLevel.momentum}\``
	});

	const msgParams:requestParams = {
		hookUrl: userSettings.hookUrl,
		msgTitle,
		color: successLevel.isSuccess ? getColor(SUCCESS) : getColor(FAILURE),
		fields,
		description
	};
	return msgParams;
};

export default getConanRequestMsg;
