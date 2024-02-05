import { combineReducers } from "redux";
import userReducer from "./userReducer";
import petReducer from "./petReducer";

const myReducer = combineReducers({
  user: userReducer,
  pet: petReducer,
});

export default myReducer;
