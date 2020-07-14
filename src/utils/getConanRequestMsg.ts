import { requestParams } from './request';
import getConanSuccessLevel, { conanSuccessLevelType } from './getConanSuccessLevel';
import joinAsBlocks from './joinAsBlocks';
import { SUCCESS, FAILURE, getColor } from './getColor';

const getConanRequestMsg = (results:Array<number>, rollOptions:any, userSettings:any) => {
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
	let description;

	const successLevel:conanSuccessLevelType = getConanSuccessLevel(
		results,
		Number(tn),
		Number(focus),
		Number(difficulty),
		untrainedTest
	);
	const successLevelIcon = successLevel.isSuccess ? ':green_circle:' : ':red_circle:';

	description = `Successes: \`${successLevel.successLevel}\` vs. Difficulty: \`${difficulty}\`.`;
	description += `\nFocus: \`${focus || 0}\``;
	description += `\nTN: \`${tn}\``;

	if (fortune && Number(fortune) > 0) {
		description += `\nFortune points used: \`${fortune}\``;
	}
	
	if (untrainedTest) {
		description += `\nUntrained Test`;
	}

	fields.push({
		name: successLevelIcon + ' Roll result:',
		value: successLevel.isSuccess ? 'SUCCESS' : 'FAILURE'
	});

	
	if (rollOptions.rerolledTimes) {
		const timesWord = rollOptions.rerolledTimes === 1 ? 'time' : 'times';

		fields.push({
			name: `:game_die: Rerolled`,
			value: `Rerolled \`${rollOptions.rerolledTimes}\` ${timesWord}.`
		});
	}

	if (successLevel.complications) {
		fields.push({
			name: `:black_circle: Complications:`,
			value: `\`${successLevel.complications}\``
		});
	}

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
