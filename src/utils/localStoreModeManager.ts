import { Mode, modes } from "../components/DiceModuleOptions/store";

const localStoreModeManager = {
  save(mode: Mode) {
    if (mode && modes.includes(mode)) {
      localStorage.setItem("ddui.mode", mode);
    }
  },

  load() {
    const mode = localStorage.getItem("ddui.mode") as Mode;
    if (mode && modes.includes(mode)) {
      return mode;
    }
  },

  clear() {
    localStorage.removeItem("ddui.mode");
  },
};

export default localStoreModeManager;
