export const SAVE_WARHAMMER_SL_TYPE = "SAVE_WARHAMMER_SL_TYPE";
export const SAVE_USER_SETTINGS = "SAVE_USER_SETTINGS";

export function saveUserSettings(userSettings: any) {
  return {
    type: SAVE_USER_SETTINGS,
    userSettings,
    // payload: userSettings
  };
}
