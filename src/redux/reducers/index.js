import { combineReducers } from "redux";

// Reducers
import home from "./home";
import account from './account';

export default combineReducers({
  home,
  account
});
