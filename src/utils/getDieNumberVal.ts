
function getDieNumberVal(diceType:string) {
	return Number(
		diceType.replace(/\D/g,'')
	);
}

export default getDieNumberVal;
