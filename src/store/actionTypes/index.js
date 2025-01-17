import { loginActionTypes } from "./login.actionTypes";
import { signUpActionTypes } from "./signUp.actionTypes";
import { homeActionTypes } from "./home.actionTypes";
import { addEditNoteActionTypes } from "./addEditNote.actionTypes";
import { resetActionTypes } from "./reset.actionTypes";

export const actionTypes = {
  ...signUpActionTypes,
  ...loginActionTypes,
  ...homeActionTypes,
  ...addEditNoteActionTypes,
  ...resetActionTypes,
};
