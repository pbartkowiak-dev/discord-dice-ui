export const OPEN_CONAN_TOKENS_MODAL = 'OPEN_CONAN_TOKENS_MODAL';
export const UPDATE_CONAN_TOKENS_STATE = 'UPDATE_CONAN_TOKENS_STATE';

export function openConanTokensModal() {
	return {
		type: OPEN_CONAN_TOKENS_MODAL
	}
}

export function updateTokensState(payload: any) {
	return {
		type: UPDATE_CONAN_TOKENS_STATE,
		payload
	}
}
