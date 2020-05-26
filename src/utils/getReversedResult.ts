function getReversedResult(result:string | number) {
	const str = typeof(result) === 'number' ? `${result}` : result;

	if (str === '100' || str === '0' || str === '00') {
		return '00';
	}
	return str.split('').reverse().join('');
}

export default getReversedResult;
