const CTHULHU_ATTRIBUTES_STATE = 'cthulhuAttributesState';

const localStorageCthulhuAttributesManager = {
	save(cthulhuSheetState: any) {
		if (cthulhuSheetState) {
			localStorage.setItem(CTHULHU_ATTRIBUTES_STATE, JSON.stringify(cthulhuSheetState));
		}
	},

	load() {
		const cthulhuSheetState = localStorage.getItem(CTHULHU_ATTRIBUTES_STATE);
		if (cthulhuSheetState) {
			try {
				return JSON.parse(cthulhuSheetState)
			} catch {
				throw new Error ('Local Storage Cthulhu Sheet format is incorrect. Clear Local Storage entry and try again.');
			}
		}
		return null;
	},

	clear() {
		localStorage.removeItem(CTHULHU_ATTRIBUTES_STATE);
	}
};

export default localStorageCthulhuAttributesManager;