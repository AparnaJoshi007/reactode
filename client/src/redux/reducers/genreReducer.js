import * as types from "../actions/actionTypes";

export const genreReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_GENRES_SUCCESS:
      return action.genres;
    default:
      return state;
  }
}
