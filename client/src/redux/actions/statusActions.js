import * as types from "./actionTypes";

export const beginApiCall = () => {
  return { type: types.BEGIN_API_CALL };
}

export const apiCallSuccess = () => {
  return { type: types.API_CALL_SUCCESS };
}

export const apiCallError = () => {
  return { type: types.API_CALL_ERROR };
}
