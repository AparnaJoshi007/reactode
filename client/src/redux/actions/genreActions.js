import * as types from "./actionTypes";
import * as genreApi from "../../api/genreApi";
import { beginApiCall, apiCallSuccess, apiCallError } from "./statusActions";

export const loadGenresSuccess = (genres) => {
  return { type: types.LOAD_GENRES_SUCCESS, genres };
}

export const loadGenres = () => {
  return function(dispatch) {
    dispatch(beginApiCall());
    return genreApi
      .getGenres()
      .then(genres => {
        dispatch(loadGenresSuccess(genres));
        dispatch(apiCallSuccess());
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
