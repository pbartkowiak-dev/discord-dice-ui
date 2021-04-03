import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { cthulhuAttributesUpdateRequested, cthulhuSkillsUpdateRequested } from "../../actions/cthulhu.actions";
import localStorageCthulhuSkillsManager from "../CthulhuSheetModal/utils/localStorageCthulhuSkillsManager";
import localStorageCthulhuAttributesManager from "../CthulhuSheetModal/utils/localStorageCthulhuAttributesManager";

function LocalStorageManager() {
	const dispatch = useDispatch();

	useEffect(() => {
		const localStorageSkills = localStorageCthulhuSkillsManager.load();
		const localStorageAttributes = localStorageCthulhuAttributesManager.load();

		if (localStorageSkills) {
			dispatch(cthulhuSkillsUpdateRequested(localStorageSkills));
		}

		if (localStorageAttributes) {
			dispatch(cthulhuAttributesUpdateRequested(localStorageAttributes));
		}
	}, [dispatch]);

	return (<> {/* LOCAL STORAGE MANAGER*/} </>);
}

export default LocalStorageManager;
