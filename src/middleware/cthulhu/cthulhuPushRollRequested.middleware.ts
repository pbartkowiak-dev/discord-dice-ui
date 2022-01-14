import {
  CTHULHU_PUSH_ROLL_REQESTED,
  requestCthulhuRoll,
} from "../../actions/cthulhu.actions";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === CTHULHU_PUSH_ROLL_REQESTED) {
    const state = store.getState();
    const { lastRollOptions } = state;

    store.dispatch(
      requestCthulhuRoll({
        ...lastRollOptions,
        isPushed: true,
      })
    );
  }
  next(action);
};
