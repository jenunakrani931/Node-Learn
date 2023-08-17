import { PRODUCT_ADD_FAILURE, PRODUCT_ADD_SUCCESSFULLY } from "../types";

const initialState = {
  product: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ADD_SUCCESSFULLY:
      return {
        ...state,
        product: action.payload,
      };
    case PRODUCT_ADD_FAILURE:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
