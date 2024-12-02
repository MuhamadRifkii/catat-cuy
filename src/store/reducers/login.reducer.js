import { actionTypes } from "../actionTypes/index";

const initState = {
  email: "",
  password: "",
  error: null,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
