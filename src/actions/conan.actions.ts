export const OPEN_TOKENS_MODAL = 'OPEN_TOKENS_MODAL';
export const UPDATE_TOKENS_STATE = 'UPDATE_TOKENS_STATE';

export function openTokensModal() {
	return {
		type: OPEN_TOKENS_MODAL
	}
}

export function updateTokensState(payload: any) {
	return {
		type: UPDATE_TOKENS_STATE,
		payload
	}
}
