import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";

//Takes all the reducers and combines them
export default combineReducers({ auth, alert });
