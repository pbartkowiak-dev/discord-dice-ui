import {
	CLOSE_CTHULHU_MODAL,
	CLOSE_CTHULHU_RESULTS_MODAL,
	CLOSE_CTHULHU_SHEET_MODAL,
	CTHULHU_ROLL_REQESTED,
	CTHULHU_DICE_ROLLED,
	CTHULHU_PUSH_ROLL_REQESTED,
	OPEN_CTHULHU_MODAL,
	OPEN_CTHULHU_SHEET_MODAL,
	CTHULHU_UPDATE_SKILLS,
	CTHULHU_UPDATE_ATTRIBUTES
} from "../actions/cthulhu.actions";
import localStorageCthulhuSkillsManager from "../components/CthulhuSheetModal/utils/localStorageCthulhuSkillsManager";
import localStorageCthulhuAttributesManager
	from "../components/CthulhuSheetModal/utils/localStorageCthulhuAttributesManager";
import { getAttributeById } from "../components/CthulhuSheetModal/utils/cthulhuAttributesList";

interface initialStateType {
	results: any,
	isPushed: boolean,
	showModal: boolean,
	showResultsModal: boolean,
	showCthulhuSheetModal: boolean,
	skills: { [key: string]: string }
	attributes: { [key: string]: string }
}

const initialState: initialStateType = {
	results: {},
	isPushed: false,
	showModal: false,
	showResultsModal: false,
	showCthulhuSheetModal: false,
	skills: {},
	attributes: {}
};

function cthulhuReducer(state = initialState, action: any) {
	switch (action.type) {
		case OPEN_CTHULHU_MODAL:
			return {
				...state,
				isPushed: false,
				showModal: true
			};
		case CTHULHU_PUSH_ROLL_REQESTED:
			return {
				...state,
				isPushed: true
			}
		case CLOSE_CTHULHU_MODAL:
			return {
				...state,
				showModal: false
			};
		case CTHULHU_ROLL_REQESTED: {
			const { skillId : id, skillLevel } = action.payload;
			if (id) {
				const isAttribute = !!getAttributeById(id);

				if (isAttribute) {
					const attributesUpdated = {...state.attributes};
					attributesUpdated[id] = skillLevel;

					localStorageCthulhuAttributesManager.save(attributesUpdated);

					return { ...state, attributes: attributesUpdated };
				} else {
					const skillsUpdated = {...state.skills};
					skillsUpdated[id] = skillLevel;

					localStorageCthulhuSkillsManager.save(skillsUpdated);

					return { ...state, skills: skillsUpdated };
				}
			}
			break;
		}
		case CTHULHU_UPDATE_SKILLS:
			// Update local storage
			localStorageCthulhuSkillsManager.save(action.payload);

			return {
				...state,
				skills: action.payload
			};
		case CTHULHU_UPDATE_ATTRIBUTES:
			// Update local storage
			localStorageCthulhuAttributesManager.save(action.payload);

			return {
				...state,
				attributes: action.payload
			};
		case CTHULHU_DICE_ROLLED:
			return {
				...state,
				results: action.payload,
				showResultsModal: true
			};
		case CLOSE_CTHULHU_RESULTS_MODAL:
			return {
				...state,
				showResultsModal: false
			}
		case OPEN_CTHULHU_SHEET_MODAL:
			return {
				...state,
				showCthulhuSheetModal: true
			}
		case CLOSE_CTHULHU_SHEET_MODAL:
			return {
				...state,
				showCthulhuSheetModal: false
			}
	}
	return state;
}

export default cthulhuReducer;
