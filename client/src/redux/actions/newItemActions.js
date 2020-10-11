export const CREATE_NEW_SNIPPET = "CREATE_NEW_SNIPPET";
export const CHANGE_CURRENT_TAB = "CHANGE_CURRENT_TAB";

export const createNewSnippet = ({ name }) => {
  return { type: CREATE_NEW_SNIPPET, name };
};

export const changeCurrentTab = ({ type }) => {
   return { type: CHANGE_CURRENT_TAB, tabType: type }
};
