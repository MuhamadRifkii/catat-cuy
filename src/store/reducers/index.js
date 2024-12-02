import { combineReducers } from "redux";
import signUpReducer from "./signUp.reducer";
import loginReducer from "./login.reducer";

const appReducer = combineReducers({
  signUpReducer,
  loginReducer
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
