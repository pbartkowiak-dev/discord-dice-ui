function getDarkHeresyIIHitLocation(result:number | string, type:string = 'human') {
	const resultNum = Number(result);
	let hitLocation = '';

	if (type === 'human') {
		switch(true) {
			case (resultNum >= 1 && resultNum <= 10):
				hitLocation = 'Head';
				break;
			case (resultNum >= 11 && resultNum <= 20):
				hitLocation = 'Right Arm';
				break;
			case (resultNum >= 21 && resultNum <= 30):
				hitLocation = 'Left Arm';
				break;
			case (resultNum >= 31 && resultNum <= 70):
				hitLocation = 'Body';
				break;
			case (resultNum >= 71 && resultNum <= 85):
				hitLocation = 'Right Leg';
				break;
			case ((resultNum >= 86 && resultNum <= 99) || resultNum === 0):
				hitLocation = 'Left Leg';
				break;
		}
	} else {
		hitLocation = 'Body';
	}
	return hitLocation;
}

export default getDarkHeresyIIHitLocation;
