export const hotkeysReducer = (hotkeys, action) => {
  switch (action.type){
    case "ADD":
      return {
        ...hotkeys,
        [[action.payload.htk]]: action.payload.URL
      };
    case "DELETE":
      delete hotkeys[action.payload.htk]
      return {
        ...hotkeys
      };
    case "INITIAL":
      return action.payload;
  }
};