import { loginActionTypes } from "./login.actionTypes";
import { signUpActionTypes } from "./signUp.actionTypes";

export const actionTypes = {
  ...signUpActionTypes,
  ...loginActionTypes,
};
