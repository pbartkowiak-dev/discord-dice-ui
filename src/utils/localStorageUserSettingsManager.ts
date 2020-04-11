const localStorageUserSettingsManager = {
	save(userSettings:any) {
		if (userSettings) {
			localStorage.setItem(
				'userSettings',
				JSON.stringify(userSettings)
			);
		}
	},

	load() {
		console.log('load')
		const userSettings = localStorage.getItem('userSettings');
		if (userSettings) {
			try {
				return JSON.parse(userSettings)
			} catch {
				throw new Error ('Local Storage User Settings Format is incorrect. Clear Local Storage entry and try again.');
			}
		}
	},

	clear() {
		localStorage.removeItem('userSettings');
	}
};

export default localStorageUserSettingsManager;