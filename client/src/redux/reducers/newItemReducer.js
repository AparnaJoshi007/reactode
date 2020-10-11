import * as types from "../actions";

export const newItemReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_NEW_SNIPPET:
      return {
        ...state,
        name: action.name
      };
    case types.CHANGE_CURRENT_TAB:
      return {
        ...state,
        tabType: action.tabType
      };
    default:
      return state;
  }
}
