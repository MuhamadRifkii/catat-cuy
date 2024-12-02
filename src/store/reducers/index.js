import { combineReducers } from "redux";
import signUpReducer from "./signUp.reducer";

const appReducer = combineReducers({
  signUpReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
