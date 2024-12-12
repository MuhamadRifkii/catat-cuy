import { actionTypes } from "../actionTypes/index";

const initState = {
  userInfo: null,
  allNotes: [],
  isLoading: false,
  openAddEditModal: { isShown: false, type: "add", data: null },
};

const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case actionTypes.SET_ALL_NOTES:
      return { ...state, allNotes: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.SET_OPEN_ADD_EDIT_MODAL:
      return { ...state, openAddEditModal: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
