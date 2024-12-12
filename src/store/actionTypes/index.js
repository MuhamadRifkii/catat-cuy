import { loginActionTypes } from "./login.actionTypes";
import { signUpActionTypes } from "./signUp.actionTypes";
import { homeActionTypes } from "./home.actionTypes";

export const actionTypes = {
  ...signUpActionTypes,
  ...loginActionTypes,
  ...homeActionTypes,
};
