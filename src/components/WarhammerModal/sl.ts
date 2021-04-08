const sl = {
	wfrp2e: '2e',
	wfrp4e: '4e',
	dh: 'dh',
	fast: 'fast'
};

export function isProperSl(val: string | null) {
	if (typeof val !== 'string') {
		return false;
	}
	return Object.values(sl).includes(val);
}

export default sl;
