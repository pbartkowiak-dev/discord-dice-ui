export type warhammerSlModeType = {
	// WFRP 4e optional rule
	fastSL: boolean

	// default Dark Heresy II DoS / DoF
	darkHeresySL: boolean

	// default WFRP 4e
	warhammer4eSL: boolean

	// default WFRP 2e
	warhammer2eSL: boolean
}

const localStorageWarhammerSlModeManager = {
	save(warhammerSlMode:warhammerSlModeType) {
		if (warhammerSlMode) {
			localStorage.setItem(
				'warhammerSlMode',
				JSON.stringify(warhammerSlMode)
			);
		}
	},

	load() {
		const warhammerSlMode = localStorage.getItem('warhammerSlMode');
		if (warhammerSlMode) {
			try {
				return JSON.parse(warhammerSlMode)
			} catch {
				throw new Error ('Local Storage Warhammer Roll Options format is incorrect. Clear Local Storage entry and try again.');
			}
		}
	},

	clear() {
		localStorage.removeItem('warhammerSlMode');
	}
};

export default localStorageWarhammerSlModeManager;