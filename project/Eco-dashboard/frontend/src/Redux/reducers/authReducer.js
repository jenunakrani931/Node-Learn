import { LOGEDIN_SUCCESSFULLY, SIGNUP_SUCCESSFULLY } from "../types";

const initialState = {
  user: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESSFULLY:
      return {
        ...state,
        user: action.payload,
      };
      case LOGEDIN_SUCCESSFULLY:
        return {
          ...state,
          user: action.payload,
        };
    default:
      return state;
  }
};
export default authReducer;
