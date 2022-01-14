import { L5R_KEEP_DICE } from "../../actions/l5r.actions";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === L5R_KEEP_DICE) {
    const state = store.getState();
    const keptIndexes = action.payload;
    const { l5rData } = state;
    const { results } = l5rData;

    const resultsKept = results.filter((_: string, i: number) =>
      keptIndexes.includes(i)
    );

    action.payload = resultsKept;
  }
  next(action);
};
