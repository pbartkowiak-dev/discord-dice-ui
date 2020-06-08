const localStorageWarhammerSlModeManager = {
	save(warhammerSlMode:string) {
		if (warhammerSlMode) {
			localStorage.setItem('warhammerSlMode', warhammerSlMode);
		}
	},

	load() {
		return localStorage.getItem('warhammerSlMode');
	},

	clear() {
		localStorage.removeItem('warhammerSlMode');
	}
};

export default localStorageWarhammerSlModeManager;