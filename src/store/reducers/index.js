import { combineReducers } from "redux";
import signUpReducer from "./signUp.reducer";
import loginReducer from "./login.reducer";
import homeReducer from "./home.reducer";

const appReducer = combineReducers({
  signUpReducer,
  loginReducer,
  homeReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
