import { actionTypes } from "../actionTypes/index";

const initState = {
  title: "",
  content: "",
  error: null,
  isLoading: false,
};

const noteReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_TITLE:
      return { ...state, title: action.payload };
    case actionTypes.SET_CONTENT:
      return { ...state, content: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_IS_LOADING:
      return { ...state, setIsLoading: action.payload };
    case actionTypes.RESET:
      return { ...initState };
    default:
      return state;
  }
};

export default noteReducer;
