import { CLOSE_MSG_MODAL } from "../actions/modals";
import { LOCAL_MSG_READY } from "../actions/roll.actions";

const initialState = {
  showMsg: false,
  msgParams: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOCAL_MSG_READY:
      return {
        ...state,
        msgParams: action.payload,
        showMsg: true,
      };
    case CLOSE_MSG_MODAL:
      return {
        msgParams: {},
        showMsg: false,
      };
  }
  return state;
};
