import * as types from "../actions";

export const statusReducer = (state = false, action) => {
  switch (action.type) {
    case types.BEGIN_API_CALL: 
      return { ...state, loading: true };
    case types.API_CALL_SUCCESS:
      return { ...state, loading: false };
    case types.API_CALL_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}
