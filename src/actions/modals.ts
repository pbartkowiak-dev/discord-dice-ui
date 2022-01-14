import { WarhammerMoneyRecalculatedPayload } from "../components/WarhammerMoneyModal/WarhammerMoneyModalTypes";

export const OPEN_INFO_MODAL = "OPEN_INFO_MODAL";
export const CLOSE_INFO_MODAL = "CLOSE_INFO_MODAL";

export const OPEN_SETTINGS_MODAL = "OPEN_SETTINGS_MODAL";
export const CLOSE_SETTINGS_MODAL = "CLOSE_SETTINGS_MODAL";

export const OPEN_MODIFIER_MODAL = "OPEN_MODIFIER_MODAL";
export const CLOSE_MODIFIER_MODAL = "CLOSE_MODIFIER_MODAL";

export const OPEN_WARHAMMER_MONEY_MODAL = "OPEN_WARHAMMER_MONEY_MODAL";
export const CLOSE_WARHAMMER_MONEY_MODAL = "CLOSE_WARHAMMER_MONEY_MODAL";

export const OPEN_CONAN_MODAL = "OPEN_CONAN_MODAL";
export const CLOSE_CONAN_MODAL = "CLOSE_CONAN_MODAL";

export const OPEN_INFINITY_MODAL = "OPEN_INFINITY_MODAL";
export const CLOSE_INFINITY_MODAL = "CLOSE_INFINITY_MODAL";

export const OPEN_MSG_MODAL = "OPEN_MSG_MODAL";
export const CLOSE_MSG_MODAL = "CLOSE_MSG_MODAL";

export const OPEN_POOL_BUILDER_MODAL = "OPEN_POOL_BUILDER_MODAL";
export const CLOSE_POOL_BUILDER_MODAL = "CLOSE_POOL_BUILDER_MODAL";

export const WARHAMMER_MONEY_RECALCULATED = "WARHAMMER_MONEY_RECALCULATED";

interface fieldEmbedded {
  name: string;
  value: string;
}
// @TODO move it to a proper place
interface requestParams {
  hookUrl: string;
  msgTitle: string;
  color: number;
  fields: Array<fieldEmbedded>;
  description: string;
}

export function openCopyrightModal() {
  return {
    type: OPEN_INFO_MODAL,
  };
}

export function closeCopyrightModal() {
  return {
    type: CLOSE_INFO_MODAL,
  };
}

export function openSettingsModal() {
  return {
    type: OPEN_SETTINGS_MODAL,
  };
}

export function closeSettingsModal() {
  return {
    type: CLOSE_SETTINGS_MODAL,
  };
}

export function openModifierModal() {
  return {
    type: OPEN_MODIFIER_MODAL,
  };
}

export function closeModifierModal() {
  return {
    type: CLOSE_MODIFIER_MODAL,
  };
}

export function openConanModal() {
  return {
    type: OPEN_CONAN_MODAL,
  };
}

export function closeConanModal() {
  return {
    type: CLOSE_CONAN_MODAL,
  };
}

export function openInfinityModal() {
  return {
    type: OPEN_INFINITY_MODAL,
  };
}

export function closeInfinityModal() {
  return {
    type: CLOSE_INFINITY_MODAL,
  };
}

export function showMsgModal(msgParams: requestParams) {
  return {
    type: OPEN_MSG_MODAL,
    msgParams,
  };
}

export function hideMsg() {
  return {
    type: CLOSE_MSG_MODAL,
  };
}

export function openPoolBuilderModal() {
  return {
    type: OPEN_POOL_BUILDER_MODAL,
  };
}

export function closePoolBuilderModal() {
  return {
    type: CLOSE_POOL_BUILDER_MODAL,
  };
}

export function openWarhammerMoneyModal() {
  return {
    type: OPEN_WARHAMMER_MONEY_MODAL,
  };
}

export function closeWarhammerMoneyModal() {
  return {
    type: CLOSE_WARHAMMER_MONEY_MODAL,
  };
}

export function warhammerMoneyRecalculated(
  payload: WarhammerMoneyRecalculatedPayload
) {
  return {
    type: WARHAMMER_MONEY_RECALCULATED,
    payload,
  };
}
