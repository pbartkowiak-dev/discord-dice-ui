const CTHULHU_SKILLS_STATE = 'cthulhuSkillsState';

const localStorageCthulhuSkillsManager = {
	save(cthulhuSheetState: any) {
		if (cthulhuSheetState) {
			localStorage.setItem(CTHULHU_SKILLS_STATE, JSON.stringify(cthulhuSheetState));
		}
	},

	load() {
		const cthulhuSheetState = localStorage.getItem(CTHULHU_SKILLS_STATE);
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
		localStorage.removeItem(CTHULHU_SKILLS_STATE);
	}
};

export default localStorageCthulhuSkillsManager;