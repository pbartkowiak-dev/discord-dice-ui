import React, { useEffect } from "react";
import { connect } from "react-redux";
import { saveUserSettings } from "../../actions";
import { openSettingsModal, closeSettingsModal } from "../../actions/modals";
import SettingsModal from "./SettingsModal";
import localStorageUserSettingsManager from "../../utils/localStorageUserSettingsManager";
import queryParamsManager from "../../utils/queryParamsManager";
import { DISCORD_WEBHOOK_URL } from "../../consts/urls";

const mapStateToProps = (state: any) => {
  return {
    userSettings: state.userSettings,
  };
};

const mapDispatchToProps = {
  openSettingsModal,
  closeSettingsModal,
  saveUserSettings,
};

function SettingsModalContainer({
  openSettingsModal,
  showModal,
  closeSettingsModal,
  saveUserSettings,
  userSettings,
}: any) {
  useEffect(() => {
    const queryQ = queryParamsManager.get("q");
    const queryDiscordUrl = queryQ ? DISCORD_WEBHOOK_URL + queryQ : null;
    const queryUsername = queryParamsManager.get("username");
    const localStorageUserSettings =
      localStorageUserSettingsManager.load() || {};

    const userSettings = {
      hookUrl: queryDiscordUrl || localStorageUserSettings.hookUrl,
      username: queryUsername || localStorageUserSettings.username,
    };

    saveUserSettings(userSettings);

    if (!userSettings.username || !userSettings.hookUrl) {
      openSettingsModal();
    }
  }, [saveUserSettings, openSettingsModal]);

  return (
    <SettingsModal
      showModal={showModal}
      closeSettingsModal={closeSettingsModal}
      saveUserSettings={saveUserSettings}
      userSettings={userSettings}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModalContainer);
