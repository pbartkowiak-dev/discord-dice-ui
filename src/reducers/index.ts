import { combineReducers } from "redux";
import userSettings from "./user-settings-reducer";
import diceSelected from "./dice-selected-reducer";
import warhammerState from "./warhammer-reducer";
import cthulhuState from "./cthulhu-reducer";
import modalsState from "./modals-reducer";
import msg from "./msg-reducer";
import rollAndKeepData from "./roll-and-keep-reducer";
import l5rData from "./l5r-reducer";
import conanData from "./conan-reducer";
import infinityData from "./infinity-reducer";
import duneData from "./dune-reducer";
import narrativeDiceData from "./narrative-dice-reducer";
import { reducer as form } from "redux-form";
import lastRollOptions from "./last-roll-options-reducer";
import rerollCount from "./reroll-count-reducer";

export default combineReducers({
  userSettings,
  diceSelected,
  warhammerState,
  cthulhuState,
  modalsState,
  form,
  msg,
  rollAndKeepData,
  l5rData,
  conanData,
  infinityData,
  duneData,
  narrativeDiceData,
  lastRollOptions,
  rerollCount,
});
