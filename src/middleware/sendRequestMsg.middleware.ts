import { REQUEST_MSG_READY } from "../actions/roll.actions";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === REQUEST_MSG_READY) {
    const state = store.getState();
    const {
      userSettings: { hookUrl },
    } = state;
    const { msgTitle, color, fields, description } = action.payload;

    if (hookUrl) {
      const msg = {
        username: "Dice Roller",
        embeds: [
          {
            title: msgTitle,
            description,
            color,
            fields,
          },
        ],
      };

      const data = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(msg),
      };

      // @TODO Add error handling
      fetch(hookUrl, data);
    }
  }
  next(action);
};
