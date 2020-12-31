export const OPEN_NARRATIVE_TOKENS_MODAL = 'OPEN_NARRATIVE_TOKENS_MODAL';
export const UPDATE_NARRATIVE_TOKENS_STATE = 'UPDATE_NARRATIVE_TOKENS_STATE';

export function openNarrativeTokensModal() {
	return {
		type: OPEN_NARRATIVE_TOKENS_MODAL
	}
}

export function updateNarrativeTokensState(payload: any) {
	return {
		type: UPDATE_NARRATIVE_TOKENS_STATE,
		payload
	}
}
