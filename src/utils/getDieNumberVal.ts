export default (diceType: string | number) => {
	if (typeof diceType === 'number') {
		return diceType;
	}
	return Number(
		diceType.replace(/\D/g,'')
	);
};
