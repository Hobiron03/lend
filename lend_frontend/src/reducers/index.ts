import { combineReducers } from "redux";
import user from "./user";
import friends from "./friends";

export default combineReducers({ user, friends });
