import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { genreReducer } from "./genreReducer";
import { statusReducer } from "./statusReducer";

const rootReducer = combineReducers({
  books: bookReducer,
  genres: genreReducer,
  status: statusReducer
});

export  { rootReducer };
