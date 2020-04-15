type getLocalMsgParamsProps = {
	fields: Array<any>,
	result: Array<any>,
	diceType: number,
	modifier: string
}

const getLocalMsgParams = ({
	fields,
	result,
	diceType,
	modifier
}:getLocalMsgParamsProps) => {
	const diceAmount = result.length;
	const rolledWord = diceAmount > 1 ? 'Results' : 'Result';
	const rolled = `${diceAmount}d${diceType}`;

	const localMsgParams = {
		title: `You rolled ${rolled}. ${rolledWord}: ${result.join(', ')}.`,
		modifier: modifier.replace(/\*\*/g, '').replace(/`/g, ''),
		fields : fields.map(({ value }) => value)
	};
	return localMsgParams;
};

export default getLocalMsgParams;