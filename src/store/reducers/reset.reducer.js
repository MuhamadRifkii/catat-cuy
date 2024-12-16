import { actionTypes } from "../actionTypes/index";

const initState = {
  email: "",
  otp: "",
  newPassword: "",
  error: null,
};

const resetReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_OTP:
      return { ...state, otp: action.payload };
    case actionTypes.SET_NEW_PASSWORD:
      return { ...state, newPassword: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.RESET:
      return { ...initState };
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default resetReducer;
