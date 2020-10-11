import { combineReducers } from "redux";
import { newItemReducer } from "./newItemReducer";

const rootReducer = combineReducers({
  newItem: newItemReducer
});

export default rootReducer;
