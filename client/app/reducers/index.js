import { combineReducers } from "redux";
import AuthReducer from "./auth";
import CarReducer from "./cars";

export default combineReducers({
  Auth: AuthReducer,
  Car: CarReducer,
});
