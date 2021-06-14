const WRATH_AND_GLORY_ROLL_REQUESTED = 'WRATH_AND_GLORY_ROLL_REQUESTED';

export function requestWrathAndGloryRoll(payload: any) {
	return {
		type: WRATH_AND_GLORY_ROLL_REQUESTED,
		payload
	}
}

