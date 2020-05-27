import { successLevelsType } from './getWarhammer4eSuccessLevels';

export default (successLevels:successLevelsType) :string => {
	if (successLevels.isAutoSuccess) {
		return 'AUTOMATIC SUCCESS';
	} else if (successLevels.isAutoFailure) {
		return 'AUTOMATIC FAILURE';
	} else if (successLevels.isSuccess) {
		return 'SUCCESS';
	} else if (successLevels.isFailure) {
		return 'FAILURE';
	}
	return '';
};