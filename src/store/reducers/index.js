import { combineReducers } from "redux";
import signUpReducer from "./signUp.reducer";
import loginReducer from "./login.reducer";
import homeReducer from "./home.reducer";
import noteReducer from "./addEditNote.reducer";
import resetReducer from "./reset.reducer";

const appReducer = combineReducers({
  signUpReducer,
  loginReducer,
  homeReducer,
  noteReducer,
  resetReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
