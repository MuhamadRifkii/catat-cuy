import { actionTypes } from "../actionTypes/index";

const initState = {
  name: "",
  email: "",
  password: "",
  error: null,
  isLoading: false,
};

const signUpReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
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

export default signUpReducer;
