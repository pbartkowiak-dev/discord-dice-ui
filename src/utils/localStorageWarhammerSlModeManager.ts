const localStorageWarhammerSlModeManager = {
	save(slType:string) {
		if (slType) {
			localStorage.setItem('slType', slType);
		}
	},

	load() {
		return localStorage.getItem('slType');
	},

	clear() {
		localStorage.removeItem('slType');
	}
};

export default localStorageWarhammerSlModeManager;